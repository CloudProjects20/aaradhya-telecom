import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { Menu, Dropdown, Space, Row, Col, Button, Tabs, Input, message, Table, Modal, Form, Radio, DatePicker, InputNumber } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import OrganizationService from '../../services/OrganizationService';

import AddNewJobPost from '../../screens/AddJobPost'
import DynamicScreen from '../../screens/DynamicScreen'


const App = () => {
    const [organizations, setOrganizations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [jobPosts, setJobPosts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    // const [form] = Form.useForm();
    // const [formLayout, setFormLayout] = useState('horizontal');
    // const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 6 }, wrapperCol: { span: 14 } } : null;

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        form.validateFields()
            .then(values => {
                console.log('Captured Job Post Data:', values);
                setJobPosts([...jobPosts, { ...values, key: jobPosts.length + 1 }]);
                setOpen(false);
            })
            .catch(info => {
                console.log('Validation Failed:', info);
            });
    };

    const handleCancel = () => {
        setOpen(false);
    };

    // const handleCancel = () => {
    //     setOpen(false);
    // };
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');

    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };
    const formItemLayout = formLayout === 'vertical' ? { labelCol: { span: 6 }, wrapperCol: { span: 14 } } : null;

    const buttonItemLayout =
        formLayout === 'horizontal'
            ? {
                wrapperCol: {
                    span: 14,
                    offset: 4,
                },
            }
            : null;

    const organizationService = new OrganizationService('Organizations');

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                setLoading(true);
                await organizationService.getOrganizations(async (orgs) => {
                    console.log(orgs)
                    setOrganizations(orgs); // Update the organizations list
                    // Fetch categories and job posts for each organization

                    let allCategories = [];
                    let allJobPosts = [];

                    for (const org of orgs) {
                        await organizationService.getCategoriesByOrgId(org.id, (async (orgCategories) => {
                            allCategories = [...allCategories, ...orgCategories];
                            for (const category of orgCategories) {
                                await organizationService.getNotifications(org.id, category.id, async (notifications) => {
                                    console.log(notifications)
                                    for (const notification of notifications) {
                                        await organizationService.getJobPosts(org.id, category.id, notification.id, async (jobPosts) => {
                                            console.log(jobPosts)
                                            console.log('-------------')
                                            allJobPosts = [...allJobPosts, ...jobPosts];
                                            setJobPosts(allJobPosts)
                                        });
                                    }
                                });
                            }
                        })); // Ensure org.id matches your document ID


                    }

                    // // Sort jobPosts by createdAt in descending order
                    allJobPosts.sort((a, b) => {
                        //console.log(a, b)
                        const dateA = timestampToDate(a.createdAt);
                        const dateB = timestampToDate(b.createdAt);
                        return dateB - dateA;
                    });

                    setCategories(allCategories);
                    setJobPosts(allJobPosts);
                });
            } catch (err) {
                console.error(err);
                setError(`Error fetching organizations: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizations();
    }, [selectedOrganization]);

    const handleOrganizationSelect = async (orgId) => {
        setSelectedOrganization(orgId);
        setCategories([]); // Reset categories when a new organization is selected

        try {
            console.log(`Selected Organization ID: ${orgId}`);

            // Fetch categories for the selected organization
            await organizationService.getCategoriesByOrgId(orgId, (cats) => {
                console.log('Fetched Categories:', cats); // Log categories response
                setCategories(cats);  // Set the categories in state after fetching
            });
        } catch (err) {
            console.error(`Error fetching categories: ${err.message}`);
            setError(`Error fetching categories: ${err.message}`);
        }
    };

    // Fetch notifications when a category is selected
    const handleCategorySelect = async (categoryId) => {
        setSelectedCategory(categoryId);
        setNotifications([]); // Reset notifications

        try {
            await organizationService.getNotifications(selectedOrganization, categoryId, (notifs) => {
                setNotifications(notifs);
            });
        } catch (err) {
            console.error(`Error fetching notifications: ${err.message}`);
        }
    };

    // Fetch notifications when a category is selected
    const handleNotificationSelect = async (notificationId) => {
        console.log('notificationId', notificationId)
        setSelectedNotification(notificationId);
        //setNotifications([]); // Reset notifications

        try {
            await organizationService.getJobPosts(selectedOrganization, selectedCategory, notificationId, (jobPosts) => {
                console.log(jobPosts)
                setJobPosts(jobPosts);
            });
        } catch (err) {
            console.error(`Error fetching notifications: ${err.message}`);
        }
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'notificationId',
        },
        {
            title: 'Post Date',
            dataIndex: 'postDate',
            key: 'postDate',
        },
        {
            title: 'Short Information',
            dataIndex: 'shortInformation',
            key: 'shortInformation',
        },
    ];
    const organizationMenu = (
        <Menu onClick={({ key }) => handleOrganizationSelect(key)}>
            {organizations.length > 0 ? (
                organizations.map((org) => (
                    <Menu.Item key={org.id}>
                        {org.organizationName}
                    </Menu.Item>
                ))
            ) : (
                <Menu.Item key="no-org">No organizations available</Menu.Item>
            )}
        </Menu>
    );

    const categoryMenu = (
        <Menu onClick={({ key }) => handleCategorySelect(key)}>
            {categories.length > 0 ? (
                categories.map((cat) => (
                    <Menu.Item key={cat.id}>
                        {cat.categoryName}
                    </Menu.Item>
                ))
            ) : (
                <Menu.Item key="no-cat">No categories available</Menu.Item>
            )}
        </Menu>
    );

    const notificationMenu = (
        <Menu onClick={({ key }) => handleNotificationSelect(key)}>
            {notifications.length > 0 ? (
                notifications.map((notif) => (
                    <Menu.Item key={notif.id}>
                        {notif.notificationNumber}
                    </Menu.Item>
                ))
            ) : (
                <Menu.Item key="no-notif">No notifications available</Menu.Item>
            )}
        </Menu>
    );

    return (
        <Layout title="Services" description="Description will go into a meta tag in <head />">
            <Row justify="start">
                {/* <Button type="dashed">Add New Organization</Button>
                <Button type="dashed">Add New Category</Button>
                <Button type="dashed">Add New Notification</Button> */}
                <Button type="primary" style={{ margin: 8 }} onClick={() => showModal(true)}>Add New Job Post</Button>
                <Button type="primary" style={{ margin: 8 }} onClick={() => showModal(true)}>Add New Result Info</Button>
                <Button type="primary" style={{ margin: 8 }} onClick={() => showModal(true)}>Add new Admit Card Info</Button>
            </Row>
            <Row>
                <Table dataSource={jobPosts} columns={columns} />
            </Row>
            {/* <DynamicScreen /> */}
            <Row>
                <Modal
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    title="Add New Job Post"
                    width={"95%"}
                    style={{ top: 20 }}

                    okButtonProps={{
                        visible: false,
                    }}
                    cancelButtonProps={{
                        visible: false,
                    }}
                    footer={null}
                >
                    {/* <AddNewJobPost /> */}
                    <DynamicScreen organizations={organizations} categories={categories} />
                </Modal>
            </Row>
        </Layout >
    );
};

export default App;
