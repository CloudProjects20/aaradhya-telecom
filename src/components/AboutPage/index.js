import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { Card } from 'antd';

export default function AboutPage() {
  return (
    <div id="about" className="row" style={{ backgroundColor: "white", padding: 10 }}>
      <Card >
        <h1>About Us</h1> 
        <p>Welcome to Aaradhya Telecom & NetCafe, <br />  <br />

          Your trusted partner in online services for competitive examinations and beyond.</p>

        <p>At our NetCafe, we understand the challenges students face when navigating the online world, especially when it comes to filling out forms for competitive exams. That's why we've made it our mission to simplify this process and provide expert guidance every step of the way.</p>

        <p>With our reliable internet connection, knowledgeable staff, and comprehensive range of services, we strive to make your online experiences convenient and hassle-free. Whether you're filling out forms, making online payments, or accessing other online services, we've got you covered.</p>

        <p>Our team is dedicated to delivering top-notch service and ensuring your satisfaction. We are committed to staying updated with the latest trends and technologies to provide you with the best possible experience.</p>

        <p>Thank you for choosing Aaradhya Telecom & NetCafe.   <br />  <br />

          We look forward to serving you and helping you achieve your goals.</p>
      </Card>
    </div>
  );
}
