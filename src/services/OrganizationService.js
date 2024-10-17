import { collection, doc, onSnapshot, addDoc, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';

class OrganizationService {
    constructor(collectionName, retries = 3, delay = 3000) {
        this.collectionName = collectionName;
        this.organizations = [];
        this.categories = [];
        this.notifications = [];
        this.jobPosts = [];
        this.retries = retries;
        this.delay = delay;
        this.loading = true;
        this.error = null;
    }

    // Fetch all Organizations
    async getOrganizations(onUpdate) {
        try {
            this.loading = true;
            const queryRef = collection(firestore, this.collectionName);

            const unsubscribe = onSnapshot(
                queryRef,
                (snapshot) => {
                    const orgs = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    this.organizations = orgs;
                    if (onUpdate) {
                        onUpdate(orgs); // Call the callback function to update state
                    }
                },
                (err) => {
                    this.error = `Error fetching organizations: ${err.message}`;
                }
            );
            this.loading = false;
            return () => unsubscribe(); // Return unsubscribe to clean up listener
        } catch (err) {
            this.error = `Error fetching organizations: ${err.message}`;
            this.loading = false;
        }
    }

    async getCategoriesByOrgId(organizationId, callback) {
        try {
            console.log('Fetching categories for Organization ID:', organizationId);
            this.loading = true;

            // Reference the subcollection 'Categories' for a specific organization
            const queryRef = collection(firestore, `${this.collectionName}/${organizationId}/Categories`);

            const unsubscribe = onSnapshot(
                queryRef,
                (snapshot) => {
                    const categories = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        organizationId,  // Keep track of which organization this category belongs to
                    }));

                    console.log('Categories fetched from Firestore:', categories);

                    // Set the categories and call the callback to update the UI
                    this.categories = categories;
                    this.loading = false;
                    callback(categories);  // Call the callback to pass categories back to the component
                },
                (err) => {
                    this.error = `Error fetching categories: ${err.message}`;
                    console.error(this.error);
                    this.loading = false;
                    callback([]);  // Return an empty array if there's an error
                }
            );

            // Return the unsubscribe function to clean up the listener
            return unsubscribe;
        } catch (err) {
            this.error = `Error fetching categories: ${err.message}`;
            console.error(this.error);
            this.loading = false;
            callback([]);  // Return an empty array if an error occurs
        }
    }

    // Fetch all Notifications for a specific Category within an Organization
    async getNotifications(organizationId, categoryId, callback) {
        try {
            console.log(`Fetching notifications for Organization ID: ${organizationId}, Category ID: ${categoryId}`);
            this.loading = true;

            // Reference to the subcollection 'notifications' within a category
            const queryRef = collection(firestore, `${this.collectionName}/${organizationId}/Categories/${categoryId}/notifications`);

            const unsubscribe = onSnapshot(
                queryRef,
                (snapshot) => {
                    const notifications = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    console.log('Notifications fetched from Firestore:', notifications);

                    // Set the notifications and call the callback to update the UI
                    this.notifications = notifications;
                    this.loading = false;
                    callback(notifications); // Return notifications to the calling component
                },
                (err) => {
                    this.error = `Error fetching notifications: ${err.message}`;
                    console.error(this.error);
                    this.loading = false;
                    callback([]); // Return empty data in case of error
                }
            );

            // Return the unsubscribe function to clean up the listener
            return unsubscribe;
        } catch (err) {
            this.error = `Error fetching notifications: ${err.message}`;
            console.error(this.error);
            this.loading = false;
            callback([]); // Return empty data in case of error
        }
    }


    // Fetch all Job Posts for a specific Category within an Organization
    async getJobPosts(organizationId, categoryId, notificationId, callback) {
        try {
            console.log(organizationId, categoryId, notificationId)
            this.loading = true;
            const queryRef = collection(firestore, `${this.collectionName}/${organizationId}/Categories/${categoryId}/notifications/${notificationId}/Posts`);

            const unsubscribe = onSnapshot(
                queryRef,
                (snapshot) => {
                    this.jobPosts = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        organizationId,
                        categoryId,
                        notificationId
                    }));
                    console.log('Job posts fetched from Firestore:', this.jobPosts);
                    this.loading = false
                    callback(this.jobPosts)
                },
                (err) => {
                    this.error = `Error fetching job posts: ${err.message}`;
                }
            );

            this.loading = false;
            return unsubscribe;
        } catch (err) {
            this.error = `Error fetching job posts: ${err.message}`;
            this.loading = false;
        }
    }

    // Fetch all Job Posts by Notification ID
    async getJobPostsByNotificationId(organization, category, notification) {
        try {
            let jobPosts = [];
            this.loading = true;
            const queryRef = collection(firestore, `${this.collectionName}/${organization.id}/Categories/${category.id}/notifications/${notification.id}/Posts`);

            const unsubscribe = onSnapshot(
                queryRef,
                (snapshot) => {
                    jobPosts = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        organization,
                        category,
                        notification,
                    }));
                    console.log('Job posts by notification fetched from Firestore:', jobPosts);
                },
                (err) => {
                    this.error = `Error fetching job posts by notification: ${err.message}`;
                }
            );

            this.loading = false;
            return () => unsubscribe();
        } catch (err) {
            this.error = `Error fetching job posts by notification: ${err.message}`;
            this.loading = false;
        }
    }

    // Bookmark a Job Post
    async bookmarkPost(job, userId) {
        try {
            const queryRef = collection(firestore, `${this.collectionName}/${job.organization.id}/Categories/${job.category.id}/Posts/${job.id}/bookmarks`);

            const q = query(queryRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                this.error = `Duplicate bookmark found for userId = ${userId}`;
                return null;
            }

            const docRef = await addDoc(queryRef, { userId, timestamp: new Date() });
            return docRef.id;
        } catch (err) {
            this.error = `Error bookmarking job post: ${err.message}`;
        }
    }
}

export default OrganizationService;
