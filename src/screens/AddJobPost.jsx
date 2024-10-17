import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { Menu, Dropdown, Space, Row, Col, Button, Tabs, Input, message, Table, Modal, Form, Radio, DatePicker, InputNumber } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import OrganizationService from '../../services/OrganizationService';

import OrganizationService from '../services/OrganizationService';
import moment from 'moment';

const { TextArea } = Input;

export default function AddnewjobPost() {
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

        // try {
        //     await organizationService.getNotifications(selectedOrganization, categoryId, (notifs) => {
        //         setNotifications(notifs);
        //     });
        // } catch (err) {
        //     console.error(`Error fetching notifications: ${err.message}`);
        // }
    };

    const [vacancies, setVacancies] = useState([
        {
            key: '1',
            zone: 'RRB Ahmedabad',
            categories: [
                { category: 'UR', noOfOpening: 202, key: 'UR' },
                { category: 'OBC', noOfOpening: 137, key: 'OBC' },
                { category: 'EWS', noOfOpening: 61, key: 'EWS' },
            ],
        },
        {
            key: '2',
            zone: 'RRB Ajmer',
            categories: [
                { category: 'UR', noOfOpening: 56, key: 'UR' },
                { category: 'OBC', noOfOpening: 35, key: 'OBC' },
                { category: 'EWS', noOfOpening: 14, key: 'EWS' },
            ],
        },
    ]);

    // Function to update a vacancy row
    const handleVacancyChange = (value, rowIndex, fieldName) => {
        const newVacancies = [...vacancies];
        newVacancies[rowIndex][fieldName] = value;
        setVacancies(newVacancies);
    };

    // Function to update a category row inside a vacancy
    const handleCategoryChange = (value, rowIndex, categoryIndex, fieldName) => {
        const newVacancies = [...vacancies];
        newVacancies[rowIndex].categories[categoryIndex][fieldName] = value;
        setVacancies(newVacancies);
    };

    // Columns for the main vacancy table
    const vacancyColumns = [
        {
            title: 'Zone',
            dataIndex: 'zone',
            key: 'zone',
            render: (text, record, index) => (
                <Input
                    value={text}
                    onChange={(e) => handleVacancyChange(e.target.value, index, 'zone')}
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record, index) => (
                <Button
                    type="danger"
                    onClick={() => {
                        const newVacancies = vacancies.filter((_, idx) => idx !== index);
                        setVacancies(newVacancies);
                    }}
                >
                    Remove Zone
                </Button>
            ),
        },
    ];

    // Columns for the nested categories table
    const categoryColumns = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text, record, categoryIndex, parentIndex) => (
                <Input
                    value={text}
                    onChange={(e) =>
                        handleCategoryChange(e.target.value, parentIndex, categoryIndex, 'category')
                    }
                />
            ),
        },
        {
            title: 'No of Openings',
            dataIndex: 'noOfOpening',
            key: 'noOfOpening',
            render: (text, record, categoryIndex, parentIndex) => (
                <Input
                    value={text}
                    onChange={(e) =>
                        handleCategoryChange(e.target.value, parentIndex, categoryIndex, 'noOfOpening')
                    }
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record, categoryIndex, parentIndex) => (
                <Button
                    type="danger"
                    onClick={() => {
                        const newVacancies = [...vacancies];
                        newVacancies[parentIndex].categories = newVacancies[parentIndex].categories.filter(
                            (_, idx) => idx !== categoryIndex
                        );
                        setVacancies(newVacancies);
                    }}
                >
                    Remove Category
                </Button>
            ),
        },
    ];

    // Expanded row render for the category table
    const expandedRowRender = (vacancy, index) => {
        return (
            <>
                <Table
                    columns={categoryColumns}
                    dataSource={vacancy.categories}
                    pagination={false}
                    rowKey="key"
                />
                <Button
                    type="primary"
                    onClick={() => {
                        const newVacancies = [...vacancies];
                        newVacancies[index].categories.push({ category: '', noOfOpening: '', key: Date.now().toString() });
                        setVacancies(newVacancies);
                    }}
                >
                    Add Category
                </Button>
            </>
        );
    };

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

    return (
        <Form {...formItemLayout} form={form} layout="vertical">
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
            </Row>
            <Row>
                <Col>
                    <Form.Item label="Notification Number" name="notificationNumber" rules={[{ required: true, message: 'Please input the notification number !' }]}>
                        <Input placeholder="Notification Number" />
                    </Form.Item>
                </Col>
                <br />
                <br />
                <Col>
                    <Form.Item label="Notification Date" name="notificationDate" rules={[{ required: true, message: 'Please input the post date!' }]}>
                        <DatePicker format="DD/MM/YYYY" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the job title!' }]}>
                    <Input placeholder="Chief Commercial Cum Ticket Supervisor" />
                </Form.Item>
                <Form.Item label="Post Date" name="postDate" rules={[{ required: true, message: 'Please input the post date!' }]}>
                    <DatePicker format="DD/MM/YYYY" />
                </Form.Item>
            </Row>
            <div style={{ withd: "100%" }}>
                <Form.Item label="Short Information" name="shortInformation" rules={[{ required: true, message: 'Please input short information!' }]}>
                    <TextArea rows={3} placeholder="Short job description..." />
                </Form.Item>
            </div>

            <Form.Item label="Total Posts" name="totalPosts" rules={[{ required: true, message: 'Please input the total number of posts!' }]}>
                <InputNumber min={1} placeholder="1736" />
            </Form.Item>
            <Tabs defaultActiveKey="1" type="card">
                <Tabs.TabPane tab="Vacancy Details" key="1">
                    <Table
                        columns={vacancyColumns}
                        dataSource={vacancies}
                        expandable={{
                            expandedRowRender,
                        }}
                        pagination={false}
                        rowKey="key"
                    />
                    <Button
                        type="primary"
                        onClick={() => {
                            setVacancies([
                                ...vacancies,
                                {
                                    key: Date.now().toString(),
                                    zone: '',
                                    categories: [{ category: '', noOfOpening: '', key: Date.now().toString() }],
                                },
                            ]);
                        }}
                    >
                        Add Zone
                    </Button>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Eligibility" key="2">
                    {/* {eligibilityForm()} */}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Application Fee" key="3">
                    <Form.Item label="Application Fee">
                        <Form.Item label="General/OBC/EWS" name={['applicationFee', 'general_obc_ews']} noStyle>
                            <InputNumber min={0} placeholder="500" />
                        </Form.Item>
                        <Form.Item label="SC/ST/PH/Female" name={['applicationFee', 'sc_st_ph_female']} noStyle>
                            <InputNumber min={0} placeholder="250" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Age Limit">
                        <Form.Item label="Minimum Age" name={['ageLimit', 'minimumAge']} noStyle>
                            <InputNumber min={18} placeholder="18" />
                        </Form.Item>
                        <Form.Item label="Maximum Age" name={['ageLimit', 'maximumAge']} noStyle>
                            <InputNumber min={18} placeholder="36" />
                        </Form.Item>
                    </Form.Item>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Important Dates" key="4">
                    <Form.Item label="Important Dates" name="importantDates">
                        <Form.Item label="Application Begin" name={['importantDates', 'applicationBegin']} noStyle>
                            <DatePicker format="DD/MM/YYYY" placeholder="Application Begin" />
                        </Form.Item>
                        <Form.Item label="Last Date Apply Online" name={['importantDates', 'lastDateApplyOnline']} noStyle>
                            <DatePicker format="DD/MM/YYYY" placeholder="Last Date Apply Online" />
                        </Form.Item>
                        <Form.Item label="Exam Date" name={['importantDates', 'examDate']} noStyle>
                            <Input placeholder="As per Schedule" />
                        </Form.Item>
                    </Form.Item>
                </Tabs.TabPane>
            </Tabs>

            <Form.Item {...formItemLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}