import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { Menu, Dropdown, Space, Row, Col, Button, Tabs, Input, message, Table, Modal, Form, Radio, DatePicker, InputNumber } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import OrganizationService from '../../services/OrganizationService';

import AddNewJobPost from '../../screens/AddJobPost'
import DynamicScreen from '../../screens/DynamicScreen'


const App = () => {
    const [size, setSize] = useState('small');
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
    // const onChange = (date, dateString) => {
    //     console.log(date, dateString);
    // };

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

                                await organizationService.getJobPosts(org.id, category.id, async (jobPosts) => {
                                    console.log(jobPosts)
                                    console.log('-------------')
                                    allJobPosts = [...allJobPosts, ...jobPosts];
                                    setJobPosts(allJobPosts)
                                });
                            }
                        }));
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
    }, []);

    const handleOrganizationSelect = async (orgId) => {
        setSelectedOrganization(orgId);
        setCategories([]); // Reset categories when a new organization is selected
        setSelectedCategory(null); // Reset the selected category as well
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
                        <b>{cat.categoryAka}</b> - {cat.categoryName}
                    </Menu.Item>
                ))
            ) : (
                <Menu.Item key="no-cat">No categories available</Menu.Item>
            )}
        </Menu>
    );

    const onFormSubmit = async ({ formData }, e) => {
        console.log('Data submitted: ', formData)
        await organizationService.createJobPost(formData);
    }

    return (
        <Layout title="Services" description="Description will go into a meta tag in <head />">
            <div style={{ margin: 10 }}>
                <Tabs
                    tabPosition='left   '
                    defaultActiveKey="1"
                    type="card"
                    size={size}
                    items={[{
                        label: `Latest Jobs`,
                        key: 'latestJobs',
                        children: <div>
                            <Row>
                                <Col style={{ padding: 8 }}>
                                    <Form.Item label="Organization" name="notificationNumber" rules={[{ required: true, message: 'Please select the Organization !' }]}>
                                        <Dropdown overlay={organizationMenu} disabled={loading}>
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    {selectedOrganization ? organizations.find(org => org.id === selectedOrganization)?.organizationName : 'Select Organization'}
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </Form.Item>
                                </Col>
                                <br />
                                <br />
                                <Col style={{ padding: 8 }}>
                                    <Form.Item label="Category" name="notificationNumber" rules={[{ required: true, message: 'Please select the Organization !' }]}>
                                        <Dropdown overlay={categoryMenu} disabled={!selectedOrganization || categories.length === 0}>
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    {selectedCategory ? categories.find(cat => cat.id === selectedCategory)?.categoryName : 'Select Category'}
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </Form.Item>
                                </Col>
                                <br />
                                <br />
                                <Col>
                                    <Button type="primary" style={{ margin: 8, }} onClick={() => showModal(true)}>Add New Job Post</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Table dataSource={jobPosts} columns={columns} />
                            </Row>
                        </div>,
                    },
                    {
                        label: `Results`,
                        key: 'results',
                        children: `Content of card tab`,
                    },
                    {
                        label: `Admit Cards`,
                        key: 'admitCards',
                        children: `Content of card tab`,
                    }]}
                />
            </div>
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
                    <DynamicScreen organizationId={selectedOrganization} categoryId={selectedCategory} onFormSubmit={onFormSubmit} />
                </Modal>
            </Row>
        </Layout >
    );
};

export default App;
