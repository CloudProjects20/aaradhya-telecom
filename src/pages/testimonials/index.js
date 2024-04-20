import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import { Avatar, List, Card, Carousel } from 'antd';

const testimonials = [
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

const TestimonialsCarausel = () => {
  let data =
    testimonials.map((testimonial, index) => {
      return (
        <div>
          <h3>{testimonial.subject}</h3>
          <p>{testimonial.content}</p>
        </div>
      )
    })

  return (
    <div>
      <Carousel autoFocus autoPlay infiniteLoop showThumbs={false} >
      <div>
        <img src={'/img/docusaurus-social-card.jpg'} alt="Image 1" height={250} />
      </div>
      <div>
        <img src={'/img/docusaurus-social-card.jpg'} alt="Image 2" height={250} />
      </div>
      <div>
        <img src={'/img/docusaurus-social-card.jpg'} alt="Image 3" height={250} />
      </div>
      </Carousel>
    </div>
  );
}

export default function Testimonials() {
  return (
    // <div>
      <TestimonialsCarausel /> 
    // </div>
    // <List
    // style={{width: 500}}
    //   itemLayout='vertical'
    //   loadMore={true} 
    //   size="large"
    //   dataSource={testimonials}
    //   renderItem={(item, index) => (
    //     <List.Item>
    //       {/* <Card style={{ width: 500 }} title={item.subject} bordered={true}>
    //         <p>{item.content}</p>
    //       </Card> */}
    //       <List.Item.Meta
    //         avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
    //         title={<a href="https://ant.design">{item.subject}</a>} 
    //       />
          
    //       <TestimonialsCarausel />
    //     </List.Item>
    //   )}
    // />
  );
}
