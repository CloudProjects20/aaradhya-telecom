import clsx from 'clsx';
import Layout from '@theme/Layout';
import { Card, Space, Col, Row } from 'antd';

const NewsLetters = [
  {
    "subject": "Unlocking Success: Mastering Data Analysis for Banking Exams",
    "content": "Discover the latest insights and strategies for excelling in banking exams through advanced data analysis techniques. Learn how to leverage data to enhance your performance and achieve your career goals."
  },
  {
    "subject": "Breaking Down Exam Trends: Analyzing Key Patterns in Banking Exams",
    "content": "Gain valuable insights into the trends and patterns shaping banking exams with our comprehensive analysis. Explore actionable data points and stay ahead of the curve in your exam preparation."
  },
  {
    "subject": "Exclusive Report: Banking Exam Performance Metrics Revealed",
    "content": "Get access to exclusive reports uncovering the performance metrics of banking exams. Dive deep into the data to understand exam trends, success rates, and areas for improvement."
  },
  {
    "subject": "Data-Driven Strategies: Maximizing Your Banking Exam Score",
    "content": "Learn proven strategies backed by data analysis to maximize your score in banking exams. Discover actionable tips and techniques to optimize your preparation and achieve success."
  },
  {
    "subject": "Insider Insights: Analyzing Banking Exam Question Trends",
    "content": "Stay informed about the latest question trends in banking exams with our in-depth analysis. Explore the types of questions frequently asked and prepare effectively to ace your exams."
  },
  {
    "subject": "Cracking the Code: Data-Backed Tips for Banking Exam Success",
    "content": "Unlock the secrets to success in banking exams with our data-backed tips and strategies. From time management techniques to subject-specific insights, empower yourself to excel in your exams."
  },
  {
    "subject": "Navigating the Exam Landscape: Analyzing Banking Exam Patterns",
    "content": "Navigate the complex landscape of banking exams with confidence using our detailed pattern analysis. Gain a deeper understanding of exam structures and optimize your preparation strategy accordingly."
  },
  {
    "subject": "Data Demystified: Understanding Analytics for Banking Exams",
    "content": "Demystify the world of data analytics as it applies to banking exams. Explore practical applications, case studies, and real-world examples to harness the power of data in your exam preparation."
  }
]


export default function NewsLetter() {
  return (
    <Space>
      <Row gutter={16}>
        {NewsLetters.map(service => {
          return (
            <Col  style={{ padding: 5 }}>
              <Card hoverable title={service.subject} bordered={true}>
                <p>{service.content}</p>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Space>
  );
}
