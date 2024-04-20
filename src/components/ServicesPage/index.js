import clsx from 'clsx';
import Layout from '@theme/Layout';
import { Card, Space, Col, Row } from 'antd';

const OurServcies = [
  {
    title: "Online Form Filling",
    description: "Expert assistance for filling online forms for various competitive examinations. Stay stress-free while we handle the paperwork.",
    link: ""
  },
  {
    title: "Railway Ticket Reservation",
    description: "Effortlessly book railway tickets online with our assistance. Skip the queues and plan your travel conveniently.",
    link: ""
  },
  {
    title: "Online Recharges",
    description: "Top up your mobile phone or other services online without any hassle. Stay connected wherever you go.",
    link: ""
  },
  {
    title: "Electricity Meter Application",
    description: "Apply for electricity meter connections online smoothly. We assist you through the entire application process.",
    link: ""
  },
  {
    title: "Resume Creation",
    description: "Create professional resumes with our guidance and templates. Present yourself effectively to potential employers",
    link: ""
  },
  {
    title: "Money Withdrawl through Aadhar",
    description: "Create professional resumes with our guidance and templates. Present yourself effectively to potential employers",
    link: ""
  },
  {
    title: "Secure Online Payments",
    description: "Make hassle-free online payments securely. We ensure your transactions are safe and protected.",
    link: ""
  },
  {
    title: "Net Surfing",
    description: "Enjoy high-speed internet access for browsing the web, conducting research, and staying connected.",
    link: ""
  }
]

export default function ServicesComponent() {
  return (
    <Space>
      <Row gutter={16}>
        {OurServcies.map(service => {
          return (
            <Col span={8} style={{ padding: 5 }}>
              <Card hoverable title={service.title} bordered={true}>
                <p>{service.description}</p>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Space>
  );
}
