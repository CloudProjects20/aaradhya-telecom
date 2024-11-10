import React, { useEffect, useState } from 'react';
import { withTheme } from '@rjsf/core';
import { ArrayFieldTemplateItemType, RJSFSchema, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { Tabs, Button } from 'antd';
import { Theme as AntDTheme } from '@rjsf/antd';
import { firestore } from '../../firebase';
import { collection, doc, onSnapshot, addDoc, query, where, getDocs, limit, orderBy, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

const { TabPane } = Tabs;
const Form = withTheme(AntDTheme);

const mapDropdownData = (data) => {
    return data.map(item => ({
        label: item.organizationName, // This will be shown in the dropdown
        value: item.id // This will be the value stored in the form
    }));
};

const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "organizationId": {
            "type": "string",
            "title": "Organization",
            "default": "",
            "enabled": false
        },
        "categoryId": {
            "type": "string",
            "title": "Category",
            "default": ""
        },
        "notificationNumber": {
            "type": "string",
            "title": "Notification Number",
            "description": "The unique number assigned to the notification."
        },
        "notificationDate": {
            "type": "string",
            "format": "date",
            "title": "Notification Date",
            "description": "The date the notification was issued."
        },
        "title": {
            "type": "string",
            "title": "Job Title",
            "description": "The title of the job post."
        },
        "postDate": {
            "type": "string",
            "format": "date",
            "title": "Post date",
            "description": "The date the job post was created."
        },
        "shortInformation": {
            "type": "string",
            "title": "Short Information",
            "description": "A brief description of the job post."
        },
        "importantDates": {
            "type": "object",
            "title": "Important Dates",
            "properties": {
                "applicationBegin": {
                    "type": "string",
                    "format": "date",
                    "title": "Application Begin Date",
                    "description": "The date the application process begins."
                },
                "lastDateApplyOnline": {
                    "type": "string",
                    "format": "date",
                    "title": "Last Date to apply Online",
                    "description": "The last date to apply online."
                },
                "lastDatePayExamFee": {
                    "type": "string",
                    "format": "date",
                    "title": "Last Date to Pay Exam Fee",
                    "description": "The last date to pay the exam fee."
                },
                "correctionWindow": {
                    "type": "string",
                    "title": "Correction Window",
                    "description": "The window of time for corrections."
                },
                "examDate": {
                    "type": "string",
                    "title": "Exam Date",
                    "description": "The date of the examination."
                },
                "admitCardAvailable": {
                    "type": "string",
                    "title": "Admit card will be available",
                    "description": "The availability of admit cards before the exam."
                }
            },
            "required": ["applicationBegin", "lastDateApplyOnline", "lastDatePayExamFee"]
        },
        "applicationFee": {
            "type": "object",
            "title": "Application Fees",
            "required": ["general_obc_ews", "sc_st_ph_female", "paymentMode"],
            "properties": {
                "general_obc_ews": {
                    "type": "integer",
                    "title": "General/OBC/EWS",
                    "description": "Application fee for General, OBC, and EWS categories."
                },
                "sc_st_ph_female": {
                    "type": "integer",
                    "title": "SC/ST/PH/Female",
                    "description": "Application fee for SC, ST, PH, and female candidates."
                },
                "paymentMode": {
                    "type": "string",
                    "title": "Payment Mode",
                    "default": "Debit Card, Credit Card, Net Banking"
                },
                "additionalInfo": {
                    "type": "array",
                    "title": "Application fees additional information",
                    "items": {
                        "type": "object",
                        "properties": {
                            "key": {
                                "type": "integer",
                                "title": "Additional Information title"
                            },
                            "value": {
                                "type": "string",
                                "title": "Additional Information value"
                            }
                        },
                        "required": ["key", "value"]
                    }
                }
            }
        },
        "ageLimit": {
            "type": "object",
            "title": "Age Limit Imformation",
            "required": ["minimumAge", "maximumAge", "ageReferenceDate"],
            "properties": {
                "minimumAge": {
                    "type": "integer",
                    "title": "Minimum Age",
                    "description": "The minimum age limit for the job."
                },
                "maximumAge": {
                    "type": "integer",
                    "title": "Maximum Age",
                    "description": "The maximum age limit for the job."
                },
                "ageReferenceDate": {
                    "type": "string",
                    "format": "date",
                    "title": "Age reference ( As of)",
                    "description": "The reference date for calculating age."
                },
                "ageRelaxation": {
                    "type": "string",
                    "title": "Age Relaxation",
                    "description": "Details about age relaxation as per rules."
                }
            }
        },
        "eligibility": {
            "type": "array",
            "title": "Eligibilities",
            "items": {
                "type": "object",
                "properties": {
                    "key": {
                        "type": "integer",
                        "title": "Seq No",
                        "description": "The key identifier for the eligibility criteria."
                    },
                    "value": {
                        "type": "string",
                        "title": "Description",
                        "description": "The description of the eligibility criteria."
                    }
                },
                "required": ["key", "value"]
            }
        },
        "vacancies": {
            "type": "array",
            "title": "Vacencies",
            "items": {
                "type": "object",
                "properties": {
                    "zone": {
                        "type": "string",
                        "description": "The zone where the job vacancy is located."
                    },
                    "totalOpenings": {
                        "type": "integer",
                        "description": "The total number of openings in the zone."
                    },
                    "categories": {
                        "type": "array",
                        "title": "Category",
                        "items": {
                            "type": "object",
                            "properties": {
                                "category": {
                                    "type": "string",
                                    "description": "The category (e.g., UR, OBC, SC, ST)."
                                },
                                "noOfOpening": {
                                    "type": "integer",
                                    "description": "The number of openings for the category."
                                },
                                "title": {
                                    "type": "string",
                                    "description": "The title of the category (if applicable)."
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "required": [
        "notificationNumber",
        "notificationDate",
        "title",
        "postDate",
        "shortInformation",
        "importantDates",
        "applicationFee",
        "ageLimit",
        "eligibility"
    ]
};


// // Custom ArrayFieldTemplate using Ant Design Tabs
// const MyArrayFieldTemplate = (props) => {
//     const [activeKey, setActiveKey] = useState('0');
//     const [items, setItems] = useState(defaultPanes);
//     const onTabChange = (key) => {
//         setActiveKey(key);
//     };

//     const onEdit = (targetKey, action) => {
//         if (action === 'add') {
//             //tabItems();
//         } else {
//             remove(targetKey);
//         }
//     };

//     const remove = (targetKey) => {
//         let newActiveKey = activeKey;
//         let lastIndex = -1;
//         items.forEach((item, i) => {
//             if (item.key === targetKey) {
//                 lastIndex = i - 1;
//             }
//         });
//         const newPanes = items.filter((item) => item.key !== targetKey);
//         if (newPanes.length && newActiveKey === targetKey) {
//             if (lastIndex >= 0) {
//                 newActiveKey = newPanes[lastIndex].key;
//             } else {
//                 newActiveKey = newPanes[0].key;
//             }
//         }
//         setActiveKey(newActiveKey);
//     };

//     const tabItems = props.items.map((item, index) => ({
//         label: `${props.schema.title} ${index + 1}`,
//         key: index,
//         children: (
//             <div key={item.key} style={{ marginBottom: '16px' }}>
//                 {item.children}
//             </div>
//         ),
//     }));
//     return (
//         <div style={{ marginBottom: '16px' }}>
//             <Button
//                 type="primary"
//                 onClick={() => props.onAddClick()}
//             >
//                 {`Add New ${props.schema.title}`}
//             </Button>
//             <Tabs            
//                 type="editable-card"
//                 activeKey={activeKey}
//                 onChange={onTabChange}
//                 onEdit={onEdit}
//                 items={tabItems} />
//         </div>
//     );
// };

const MyArrayFieldTemplate = (props) => {
    const [activeKey, setActiveKey] = useState('0');  // default active tab key
    const [items, setItems] = useState(
        props.items.map((item, index) => ({
            label: `${props.schema.title} ${index + 1}`,
            key: index.toString(),
            children: (
                <div key={item.key} style={{ marginBottom: '16px' }}>
                    {item.children}
                </div>
            ),
        }))
    );

    const onTabChange = (key) => {
        setActiveKey(key);
    };

    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            addTab();
        } else {
            removeTab(targetKey);
        }
    };

    const addTab = () => {
        const newIndex = items.length;
        const newTab = {
            label: `${props.schema.title} ${newIndex + 1}`,
            key: newIndex.toString(),
            children: (
                <div key={newIndex} style={{ marginBottom: '16px' }}>
                    {props.onAddClick()} {/* Calls the onAddClick function to create new item */}
                </div>
            ),
        };
        const tabItems = props.items.map((item, index) => ({
            label: `${props.schema.title} ${index + 1}`,
            key: index,
            children: (
                <div key={item.key} style={{ marginBottom: '16px' }}>
                    {item.children}
                </div>
            ),
        }));
        setItems([...items, newTab]);
        setActiveKey(newTab.key);
    };

    const removeTab = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });

        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    return (
        <div style={{ marginBottom: '16px' }}>
            <Button type="primary" onClick={addTab}>
                {`Add New ${props.schema.title}`}
            </Button>
            <Tabs
                type="editable-card"
                activeKey={activeKey}
                onChange={onTabChange}
                onEdit={onEdit}
                items={items}
            />
        </div>
    );
};

const uiSchema = {
    "notificationNumber": {
        "ui:autofocus": true,
        "ui:emptyValue": "",
        "ui:placeholder": "ui:emptyValue causes this field to always be valid despite being required",
        "ui:autocomplete": "family-name",
        "ui:enableMarkdownInDescription": true,
        "ui:description": "Notification Number"
    },
    "shortInformation": {
        "ui:widget": "textarea",
    },
    'ui:ArrayFieldTemplate': MyArrayFieldTemplate,
    "arrayField": {
        "ui:options": {
            addable: true,
            orderable: true,
            removable: true,
        },
    },
};

// function ArrayFieldItemTemplate(props) {
//     const { children, className } = props;
//     return <div style={{ paddingLeft: 10, marginLeft: 10 }}>{children}</div>;
// }


const log = (type) => console.log.bind(console, type);

const CustomTitleField = ({ title, required }) => {
    return (
        <h3 style={{ color: 'blue', fontSize: '24px' }}>
            {title}
            {required ? '*' : null}
        </h3>
    );
};

const customFields = { TitleField: CustomTitleField };
// const customWidgets = { CheckboxWidget: CustomCheckbox };



const AddnewJobPosting = (props) => {
    const { organizationId, categoryId, onFormSubmit } = props
    const [formSchema, setFormSchema] = useState(schema);

    useEffect(() => {
        const fetchZonesFromDB = async () => {

            setFormSchema(prevSchema => ({
                ...prevSchema,
                properties: {
                    ...prevSchema.properties,
                    organizationId: {
                        ...prevSchema.properties.organizationId,
                        default: organizationId
                    },
                    categoryId: {
                        ...prevSchema.properties.categoryId,
                        default: categoryId
                    }
                }
            }));
        };
        fetchZonesFromDB();
    }, []);

    return (
        <Form
            schema={formSchema}
            uiSchema={uiSchema}
            validator={validator}
            templates={{ ArrayFieldTemplate: MyArrayFieldTemplate }}
            onChange={log('changed')}
            onSubmit={onFormSubmit}
            onError={log('errors')}
            name='Add New Post'
            fields={customFields}
        />)
};

export default AddnewJobPosting

/**
 * 
    "feeRefund": {
        "type": "object",
        "properties": {
            "ur_obc_ews": {
                "type": "integer",
                "description": "Refund amount for UR, OBC, and EWS candidates."
            },
            "sc_st_ph_female": {
                "type": "integer",
                "description": "Refund amount for SC, ST, PH, and female candidates."
            }
        },
        "required": ["ur_obc_ews", "sc_st_ph_female"],
        "description": "Contains information about fee refunds."
    },
 */