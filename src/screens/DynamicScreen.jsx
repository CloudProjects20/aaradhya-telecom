import React, { useEffect, useState } from 'react';
import { withTheme } from '@rjsf/core';
import { ArrayFieldTemplateItemType, RJSFSchema, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { Theme as AntDTheme } from '@rjsf/antd';
// Make modifications to the theme with your own fields and widgets
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
        "organizations": {
            "type": "string",
            "title": "Organization",
            "enum": ["RRB","SSC"]
            // "enum": mapDropdownData(organizations).map(option => option.value), // Store ID
            // "enumNames": mapDropdownData(zoneData).map(option => option.label) // Display name
        },
        "categories": {
            "type": "string",
            "title": "Categories",
            "enum": []  // Enum will be populated dynamically
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
                            },
                            "required": ["category", "noOfOpening"]
                        },
                        "description": "The breakdown of openings by category."
                    }
                },
                "required": ["zone", "totalOpenings", "categories"]
            }
        }
    },
    "required": [
        "notificationNumber",
        "notificationDate",
        "title",
        "postDate",
        "shortInformation",
        "totalPosts",
        "importantDates",
        "applicationFee",
        "ageLimit",
        "eligibility",
        "vacancies"
    ]
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
    }
};

function ArrayFieldItemTemplate(props) {
    const { children, className } = props;
    return <div style={{ paddingLeft: 10, marginLeft: 10 }}>{children}</div>;
}

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

const onSubmit = ({ formData }, e) => {
    console.log('Data submitted: ', formData)
}

const AddnewJobPosting = (props) => {
    const { organizations, categories } = props
    const [formSchema, setFormSchema] = useState(schema);

    useEffect(() => {
        const fetchZonesFromDB = async () => {

            setFormSchema(prevSchema => ({
                ...prevSchema,
                properties: {
                    ...prevSchema.properties,
                    organizations: {
                        ...prevSchema.properties.organizations,
                        enum: organizations
                    },
                    categories: {
                        ...prevSchema.properties.categories,
                        enum: categories
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
            onChange={log('changed')}
            onSubmit={onSubmit}
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