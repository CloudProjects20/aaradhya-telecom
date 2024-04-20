import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { Card, Space, Col, Row, Button, Rate, Avatar, Typography, TextArea, Input, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React from 'react';
const { Text, Link } = Typography;
import Testimonials from '../../pages/testimonials/index'
import ContactUs from '../ContactPage/index';
import AboutPage from '../AboutPage';


function navigateToDiv(divId) {
  console.log(divId)
  var targetDiv = document.getElementById(divId);
  console.log(targetDiv)
  targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const FeatureList = [
  {
    title: 'Online Form Filling',
    Svg: require('@site/static/img/form-svgrepo-com.svg').default,
    link: "#OnlineFormFillling",
    description: (
      <p>
        Expert assistance for filling online forms for various competitive examinations. Stay stress-free while we handle the paperwork.
      </p>
    )
  },
  {
    title: 'Rail Reservations',
    Svg: require('@site/static/img/ticket-8-svgrepo-com.svg').default,
    link: "#RailReservation",
    description: (
      <p>
        Effortlessly book railway tickets online with our assistance. Skip the queues and plan your travel conveniently.
      </p>
    ),
  },
  {
    title: "Money Transfer",
    Svg: require('@site/static/img/online-payment-svgrepo-com.svg').default,
    link: "#MoneyTransfer",
    description: (<p>Make hassle-free online payments securely. We ensure your transactions are safe and protected.</p>)
  },
  {
    title: "Electricity Meter Application",
    Svg: require('@site/static/img/electricity-cable-svgrepo-com.svg').default,
    link: "#ElectricityMeterApplication",
    description: (<p>Apply for electricity meter connections online smoothly. We assist you through the entire application process.</p>)
  },
  {
    title: "Resume Creation",
    Svg: require('@site/static/img/resume-portfolio-svgrepo-com.svg').default,
    link: "#ResumeCreation",
    description: (<p>Create professional resumes with our guidance and templates. Present yourself effectively to potential employers</p>)
  },
  {
    title: "Money Withdrawl through Aadhar",
    Svg: require('@site/static/img/money-send-svgrepo-com.svg').default,
    link: "#MoneyWithdrawal",
    description: (<p>Create professional resumes with our guidance and templates. Present yourself effectively to potential employers</p>)
  },
  {
    title: "Secure Online Payments",
    Svg: require('@site/static/img/online-payment-svgrepo-com.svg').default,
    link: "#SecurePayments",
    description: (<p>Make hassle-free online payments securely. We ensure your transactions are safe and protected.</p>)
  },
  {
    title: "Net Surfing",
    Svg: require('@site/static/img/internet-connection-svgrepo-com.svg').default,
    link: "#NetSurfing",
    description: (<p>Enjoy high-speed internet access for browsing the web, conducting research, and staying connected.</p>)
  },
  {
    title: 'Online Recharges',
    Svg: require('@site/static/img/reload-svgrepo-com.svg').default,
    link: "#Onlinerecharges",
    description: (
      <p>
        Top up your mobile phone or other services online without any hassle. Stay connected wherever you go.
      </p>
    ),
  }
];

const testimonials = [
  {
    "name": "Mukesh",
    "rating": 5,
    "comment": "Aaradhya Telecom & Net Cafe has been a lifesaver for me! Whether it's filling out forms, recharging my phone, or accessing the internet, they offer everything I need under one roof."
  },
  {
    "name": "Sunil",
    "rating": 4.8,
    "comment": "I'm impressed by the friendly staff and excellent service at Aaradhya Telecom & Net Cafe. Their expertise and assistance have made my online experiences seamless and stress-free."
  },
  {
    "name": "Rakesh",
    "rating": 5,
    "comment": "The high-speed internet connection at Aaradhya Telecom & Net Cafe is a game-changer! It's perfect for my online study sessions and video calls. I highly recommend it to everyone."
  },
  {
    "name": "Nitin",
    "rating": 4.7,
    "comment": "I've been using Aaradhya Telecom & Net Cafe for railway ticket reservations, and I'm thoroughly impressed by their efficiency and reliability. It's my go-to place for all online services."
  },
  {
    "name": "Anuj",
    "rating": 5,
    "comment": "The resume creation service at Aaradhya Telecom & Net Cafe helped me land my dream job! The templates are professional, and the guidance provided was invaluable. Thank you!"
  },
  {
    "name": "Aditya",
    "rating": 4.9,
    "comment": "I appreciate the convenience of the online payment service at Aaradhya Telecom & Net Cafe. It's secure, easy to use, and saves me a lot of time. Keep up the great work!"
  },
  {
    "name": "Ajay",
    "rating": 5,
    "comment": "Aaradhya Telecom & Net Cafe is my go-to place for all my online needs. The staff is always helpful, and the range of services they offer is impressive. I couldn't be happier!"
  },
  {
    "name": "Vikas",
    "rating": 4.8,
    "comment": "I've had a wonderful experience at Aaradhya Telecom & Net Cafe. The atmosphere is welcoming, and the services are top-notch. I highly recommend it to anyone looking for reliable online solutions."
  }
]

const TestimonialsCarausel = () => {
  return (
    <div className='row' style={{ paddingTop: 10, alignContent: "center", alignSelf: "center", backgroundColor: "white" }}>
      <Carousel autoFocus autoPlay infiniteLoop showThumbs={false} showArrows={false} showIndicators={false} showStatus={false}>
        {testimonials.map((testimonial, index) => {
          return (
            <div style={{ height: 150, alignSelf: "flex-start", borderBottomStyle: "groove", borderColor: "orange" }}>
              <Space direction='vertical'>
                <Avatar size={50}>{testimonial.name}</Avatar>
                <Text>{testimonial.comment}</Text>
                <Rate disabled allowHalf defaultValue={testimonial.rating} />
              </Space>
            </div>
          )
        })}
      </Carousel >
    </div >
  );
}


const ImagesCarousel = () => {
  return (
    <div className='row' style={{ paddingTop: 10 }}>
      <Carousel autoFocus autoPlay infiniteLoop showThumbs={false} showArrows={false} showIndicators={false} showStatus={false} autoplaySpeed={3000}>
        <div>
          {/* <Avatar src={`/img/students_group1.jpg`} size={100} shape='circle'> IPBS</Avatar>&nbsp;
          <Avatar src={`/img/logos/ssc.jfif`} size={100} shape='circle'> IPBS</Avatar> &nbsp;
          <Avatar src={`/img/logos/SBI-logo.svg.png.png`} size={100} shape='circle'> IPBS</Avatar>&nbsp;
          <Avatar src={`/img/logos/SBI-logo.svg.png.png`} size={100} shape='circle'> IPBS</Avatar>&nbsp;  */}
          {/* <Image src={`/img/docusaurus-social-card.jpg`} alt="students_group1" /> */}
          <Image src='C:/Projects/Technoverse/docusaurus-website/src/components/HomePage/img/banner6.jpg' alt="banner6" />
        </div>
        <div>
          <Image src={`/img/students_group1.jpg`} alt="students_group1" />
          {/* <Avatar src={`/img/logos/ssc.jfif`} size={100} shape='circle'> IPBS</Avatar> &nbsp;
          <Avatar src={`/img/logos/SBI-logo.svg.png.png`} size={100} shape='circle'> IPBS</Avatar>&nbsp;
          <Avatar src={`/img/logos/ssc.jfif`} size={100} shape='circle'> IPBS</Avatar> &nbsp;  */}
        </div>
      </Carousel>
    </div>
  );
};

const Banner = () => {
  return (
    <div className='row' style={{ backgroundColor: "pink" }}>
      <div>
        <span>this is text</span>
      </div>
    </div>
  )
}

const Feature = ({ Svg, title, description, link }) => {
  return (
    <div className={clsx('col col--4')} style={{ padding: 5 }}  >
      <Card bordered={false} hoverable>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3"> {title} </Heading>
          <p>{description}</p>
          <a href={link}>Explore More</a>
        </div>
      </Card>
    </div>
  );
}

const Features = () => {
  return (
    <div className="row" style={{ paddingTop: 10, backgroundColor: "white" }}>
      {FeatureList.map((props, idx) => (
        <Feature key={idx} {...props} />
      ))}
    </div>
  );
}

const OnlineFormFillling = () => {
  return (
    <div id="OnlineFormFillling" className="row" style={{ backgroundColor: "white" }}>
      <Card >
        <h1 >Online Form Filling Service</h1>
        {/* <Carousel autoFocus autoPlay infiniteLoop showThumbs={false} showArrows={false} showIndicators={false} showStatus={false} autoplaySpeed={3000}>
          <div>
            <Avatar src={`/img/logos/ssc.jfif`} size={100} shape='circle'> IPBS</Avatar> &nbsp; 
          </div>
          <div>
            <Avatar src={`/img/logos/ssc.jfif`} size={100} shape='circle'> IPBS</Avatar> &nbsp; 
          </div>
        </Carousel> */}
        <br />
        <p>At Aaradhya Telecom & Net Cafe, we understand the challenges and complexities students face when filling out online forms for various competitive examinations. That's why we offer expert assistance to streamline this process and alleviate the burden from your shoulders.</p>

        <h2>Expert Guidance and Assistance</h2>

        <p>Our team of experienced professionals is dedicated to providing you with personalized guidance and support throughout the online form filling process. Whether you're applying for entrance exams, government job applications, or university admissions, we have the expertise to ensure that your forms are filled accurately and efficiently.</p>

        <h2>Stay Stress-Free</h2>

        <p>With our online form filling service, you can say goodbye to the stress and hassle of navigating complex application procedures. Focus on your exam preparation while we take care of the paperwork for you. Our goal is to make the entire process as smooth and stress-free as possible, allowing you to concentrate on what truly matters – achieving your academic and career goals.</p>

        <h2>Comprehensive Assistance</h2>

        <p>From understanding the requirements of different exam forms to ensuring that all necessary fields are correctly filled, we provide comprehensive assistance every step of the way. Whether you're dealing with online registration portals, payment gateways, or document uploads, we'll guide you through the process with ease.</p>

        <h2>Why Choose Us?</h2>

        <ul>
          <li><strong>Expertise:</strong> Benefit from the expertise of our team who are well-versed in the intricacies of online form filling for various competitive examinations.</li>
          <li><strong>Reliability:</strong> Rely on us to handle your paperwork accurately and efficiently, giving you peace of mind throughout the application process.</li>
          <li><strong>Convenience:</strong> Save time and effort by entrusting us with your online form filling needs, allowing you to focus on your exam preparation without distractions.</li>
          <li><strong>Personalized Support:</strong> Receive personalized support and guidance tailored to your specific requirements, ensuring a seamless experience from start to finish.</li>
        </ul>
      </Card>
    </div>
  );
}


const RailReservation = () => {
  return (
    <div id="RailReservation" className="row" style={{ backgroundColor: "white" }}>
      <Card >
        <h1>Rail Reservations</h1>

        <p>Effortlessly book railway tickets online with the assistance of Aaradhya Telecom & Net Cafe. Say goodbye to long queues and tedious booking processes, and plan your travel conveniently with our expert help.</p>

        <h2>Skip the Queues</h2>

        <p>Gone are the days of waiting in long queues at railway stations to book tickets. With our online rail reservation service, you can skip the queues and book your tickets from the comfort of your home or office. Save time and effort by availing our hassle-free booking assistance.</p>

        <h2>Convenient Travel Planning</h2>

        <p>Planning your travel has never been easier. Whether you're commuting for work or embarking on a leisure trip, our rail reservation service simplifies the booking process, allowing you to select preferred travel dates, check seat availability, and secure your tickets with ease. Enjoy peace of mind knowing that your travel arrangements are taken care of efficiently.</p>

        <h2>Why Choose Us?</h2>

        <ul>
          <li><strong>Expert Assistance:</strong> Benefit from our expert assistance in booking railway tickets online, ensuring a smooth and hassle-free experience.</li>
          <li><strong>Time-Saving:</strong> Save valuable time by skipping the queues and booking your tickets conveniently from anywhere, anytime.</li>
          <li><strong>Convenience:</strong> Enjoy the convenience of planning your travel effortlessly with our user-friendly online reservation service.</li>
          <li><strong>Reliability:</strong> Rely on our reliable service to handle your rail reservations accurately and securely, leaving you with peace of mind.</li>
        </ul>
      </Card>
    </div>
  );
}


const MoneyTransfer = () => {
  return (
    <div id="MoneyTransfer" className="row" style={{ backgroundColor: "white" }}>
      <Card >
        <h1>Money Transfer</h1>

        <p>Make hassle-free online payments securely with Aaradhya Telecom & Net Cafe. Whether you need to transfer money to friends and family, pay bills, or make purchases online, we've got you covered.</p>

        <h2>Safe and Protected Transactions</h2>

        <p>At Aaradhya Telecom & Net Cafe, we understand the importance of security when it comes to online transactions. That's why we prioritize the safety and protection of your financial information. Rest assured that your transactions are encrypted and secured using the latest technology, keeping your sensitive data safe from unauthorized access.</p>

        <h2>Hassle-Free Payments</h2>

        <p>Say goodbye to the hassle of traditional payment methods and enjoy the convenience of making online payments with ease. With our user-friendly platform, you can transfer money, pay bills, or shop online effortlessly, saving you time and effort.</p>

        <h2>Why Choose Us?</h2>

        <ul>
          <li><strong>Security:</strong> Trust our secure platform to safeguard your financial transactions and protect your sensitive information.</li>
          <li><strong>Convenience:</strong> Enjoy the convenience of making hassle-free online payments anytime, anywhere, with just a few clicks.</li>
          <li><strong>Reliability:</strong> Rely on our reliable service to ensure that your transactions are processed smoothly and efficiently.</li> 
        </ul>
      </Card>
    </div>
  );
}

const ElectricityMeterApplication = () => {
  return (
    <div id="ElectricityMeterApplication" className="row" style={{ backgroundColor: "white" }}>
      <Card >
        <h1>Electricity Meter Application</h1>

        <p>Apply for electricity meter connections online smoothly with Aaradhya Telecom & Net Cafe. Whether you're moving into a new property or need to upgrade your existing meter, we're here to assist you through the entire application process.</p>

        <h2>Streamlined Application Process</h2>

        <p>Our user-friendly platform makes it easy to submit your electricity meter application online. Simply fill out the necessary information, upload any required documents, and our team will take care of the rest. Say goodbye to lengthy paperwork and administrative hassles.</p>

        <h2>Expert Assistance</h2>

        <p>Our experienced staff is here to guide you through the application process and address any questions or concerns you may have. From understanding application requirements to providing updates on the status of your application, we're committed to ensuring a smooth and seamless experience for you.</p>

        <h2>Why Choose Us?</h2>

        <ul>
          <li><strong>Convenience:</strong> Enjoy the convenience of applying for electricity meter connections online from the comfort of your home or office.</li>
          <li><strong>Efficiency:</strong> Save time and effort with our streamlined application process, allowing you to focus on other priorities.</li>
          <li><strong>Expert Guidance:</strong> Benefit from the expertise of our team who will assist you every step of the way, ensuring a hassle-free experience.</li>
          <li><strong>Reliability:</strong> Rely on our reliable service to process your application accurately and efficiently, delivering timely results.</li>
        </ul>
      </Card>
    </div>
  );
}

const ResumeCreation = () => {
  return (
    <div id="ResumeCreation" className="row" style={{ backgroundColor: "white" }}>
      <Card >
        <h1>Resume Creation</h1>

        <p>Create professional resumes with our guidance and templates at Aaradhya Telecom & Net Cafe. Present yourself effectively to potential employers and stand out from the crowd with a polished and professional resume.</p>

        <h2>Expert Guidance and Templates</h2>

        <p>Our experienced team is here to provide you with expert guidance and assistance in creating a compelling resume that highlights your skills, qualifications, and achievements. Choose from a range of professionally designed templates to create a resume that suits your style and preferences.</p>

        <h2>Effective Presentation</h2>

        <p>A well-crafted resume is essential for making a positive impression on potential employers. Our team will help you structure your resume effectively, ensuring that key information is presented clearly and concisely. From formatting to language choice, we'll guide you every step of the way to create a resume that leaves a lasting impact.</p>

        <h2>Why Choose Us?</h2>

        <ul>
          <li><strong>Professionalism:</strong> Trust our experienced team to create a professional resume that showcases your skills and qualifications effectively.</li>
          <li><strong>Customization:</strong> Choose from a variety of templates and customization options to create a resume that reflects your unique personality and style.</li>
          <li><strong>Impactful Presentation:</strong> Present yourself effectively to potential employers with a well-structured and visually appealing resume that highlights your strengths and accomplishments.</li>
          <li><strong>Personalized Support:</strong> Benefit from personalized support and guidance throughout the resume creation process, ensuring that your resume meets your specific needs and objectives.</li>
        </ul>
      </Card>
    </div>
  );
}
const MoneyWithdrawal = () => {
  return (
    <div id="MoneyWithdrawal" className="row" style={{ backgroundColor: "white" }}>
      <Card >
        <h1>Money Withdrawal through Aadhar Authentication</h1>

        <p>Withdraw money securely and conveniently using Aadhar authentication with Aaradhya Telecom & Net Cafe. Our Aadhar-enabled payment system allows you to access your funds easily without the need for physical bank cards or documents.</p>

        <h2>Secure and Convenient</h2>

        <p>Our Aadhar-enabled payment system ensures secure transactions while providing you with the convenience of accessing your funds anytime, anywhere. Simply authenticate your identity using your Aadhar number and fingerprint, and withdraw cash hassle-free.</p>

        <h2>Easy Access to Funds</h2>

        <p>Say goodbye to long queues at bank branches and ATMs. With our Aadhar-enabled payment system, you can withdraw money quickly and easily from our convenient location, saving you time and effort.</p>

        <h2>Why Choose Us?</h2>

        <ul>
          <li><strong>Security:</strong> Trust our secure Aadhar-enabled payment system to safeguard your financial transactions and protect your identity.</li>
          <li><strong>Convenience:</strong> Enjoy the convenience of withdrawing money without the need for physical bank cards or documents.</li>
          <li><strong>Accessibility:</strong> Access your funds anytime, anywhere from our convenient location, eliminating the need to visit bank branches or ATMs.</li>
          <li><strong>Reliability:</strong> Rely on our reliable service to ensure smooth and seamless money withdrawal transactions.</li>
        </ul>
      </Card>
    </div>
  );
}

const SecurePayments = () => {
  return (
    <div id="SecurePayments" className="row" style={{ backgroundColor: "white" }}>
      <Card >
        <h1>Secure Online Payments</h1>

        <p>Make hassle-free online payments securely with Aaradhya Telecom & Net Cafe. We understand the importance of security when it comes to online transactions, and we prioritize the safety and protection of your financial information.</p>

        <h2>Safe and Protected Transactions</h2>

        <p>Rest assured that your transactions are safe and protected with us. We employ the latest encryption technology to secure your financial information and prevent unauthorized access. Your sensitive data is encrypted and transmitted securely, ensuring that your online payments are processed safely.</p>

        <h2>Hassle-Free Experience</h2>

        <p>Enjoy a hassle-free experience when making online payments with us. Our user-friendly platform makes it easy to complete transactions quickly and securely, saving you time and effort. Whether you're paying bills, shopping online, or transferring money, we ensure a seamless payment process.</p>

        <h2>Why Choose Us?</h2>

        <ul>
          <li><strong>Security:</strong> Trust our secure platform to safeguard your financial transactions and protect your sensitive information.</li>
          <li><strong>Convenience:</strong> Enjoy the convenience of making hassle-free online payments anytime, anywhere, with just a few clicks.</li>
          <li><strong>Reliability:</strong> Rely on our reliable service to ensure that your transactions are processed smoothly and efficiently.</li> 
        </ul>
      </Card>
    </div>
  );
}
const NetSurfing = () => {
  return (
    <div id="NetSurfing" className="row" style={{ backgroundColor: "white" }}>
      <Card >
        <h1>Net Surfing</h1>

        <p>Enjoy high-speed internet access for browsing the web, conducting research, and staying connected with Aaradhya Telecom & Net Cafe. Whether you need to check emails, browse social media, or stream videos, our reliable internet connection ensures a seamless online experience.</p>

        <h2>High-Speed Internet Access</h2>

        <p>Access the internet at lightning-fast speeds with our high-speed internet connection. Whether you're conducting research for your studies, staying updated with the latest news, or simply browsing your favorite websites, our reliable internet service ensures a smooth and uninterrupted browsing experience.</p>

        <h2>Stay Connected Anywhere</h2>

        <p>Stay connected wherever you go with our internet access services. Whether you're at home, at work, or on the go, our internet connection allows you to stay connected with friends, family, and colleagues, no matter where you are.</p>

        <h2>Why Choose Us?</h2>

        <ul>
          <li><strong>High-Speed Connectivity:</strong> Enjoy blazing-fast internet speeds for seamless web browsing, research, and communication.</li>
          <li><strong>Reliable Service:</strong> Rely on our reliable internet connection to stay connected without interruptions or downtime.</li>
          <li><strong>Convenience:</strong> Access the internet from our convenient location, whether you're in the neighborhood or passing by.</li>
          <li><strong>Professional Support:</strong> Benefit from our professional support team who are available to assist you with any internet-related queries or concerns.</li>
        </ul>
      </Card>
    </div>
  );
}

const Onlinerecharges = () => {
  return (
    <div id="Onlinerecharges" className="row" style={{ backgroundColor: "white" }}>
      <Card >
        <h1>Online Recharges</h1>

        <p>Top up your mobile phone or other services online without any hassle with Aaradhya Telecom & Net Cafe. Stay connected wherever you go with our convenient online recharge services.</p>

        <h2>Hassle-Free Recharges</h2>

        <p>Forget about the inconvenience of visiting physical stores to recharge your mobile phone or other services. With our online recharge services, you can top up your accounts quickly and easily from the comfort of your home or on the go.</p>

        <h2>Stay Connected Anywhere</h2>

        <p>Stay connected wherever you go with our online recharge services. Whether you need to top up your mobile phone balance, recharge your DTH or data card, or pay your utility bills, we've got you covered with our wide range of recharge options.</p>

        <h2>Why Choose Us?</h2>

        <ul>
          <li><strong>Convenience:</strong> Enjoy the convenience of topping up your accounts online anytime, anywhere, without any hassle.</li>
          <li><strong>Accessibility:</strong> Access our online recharge services from any device with internet connectivity, ensuring that you can stay connected wherever you are.</li>
          <li><strong>Wide Range of Services:</strong> Benefit from our extensive range of recharge options, including mobile, DTH, data card, and utility bill payments.</li>
          <li><strong>Secure Transactions:</strong> Rest assured that your online transactions are safe and protected with us, with the latest security measures in place to safeguard your financial information.</li>
        </ul>
      </Card>
    </div>
  );
}

const AboutUs = () => {
  return (
    <div id="about" className="row" style={{ backgroundColor: "white" }}>
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

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div style={{ padding: 1 }}>
          <div className='row'>
            {/* <ImagesCarousel /> */} 
          </div>
          <div className="row" style={{ paddingTop: 5, alignContent: "center", alignSelf: "center", borderRadius: 4 }}>
            <Features />
          </div>
          <div className="row" style={{ paddingTop: 5, alignContent: "center", alignSelf: "center", borderRadius: 4 }}>
            <OnlineFormFillling />
          </div>
          <div className="row" style={{ paddingTop: 5, alignContent: "center", alignSelf: "center", borderRadius: 4 }}>
            <RailReservation />
          </div>
          <div className="row" style={{ paddingTop: 5, alignContent: "center", alignSelf: "center", borderRadius: 4 }}>
            <ResumeCreation />
          </div>
          <div className="row" style={{ paddingTop: 5, alignContent: "center", alignSelf: "center", borderRadius: 4 }}>
            <ElectricityMeterApplication />
          </div>
          <div className="row" style={{ paddingTop: 5, alignContent: "center", alignSelf: "center", borderRadius: 4 }}>
            <SecurePayments />
          </div>
          <div className="row" style={{ paddingTop: 5, alignContent: "center", alignSelf: "center", borderRadius: 4 }}>
            <NetSurfing />
          </div>
          <div className="row" style={{ paddingTop: 5, alignContent: "center", alignSelf: "center", borderRadius: 4 }}>
            <MoneyWithdrawal />
          </div>
          <div className="row" style={{ paddingTop: 5, alignContent: "center", alignSelf: "center", borderRadius: 4 }}>
            <MoneyTransfer />
          </div>
          <div className="row" style={{ paddingTop: 5, alignContent: "center", alignSelf: "center", borderRadius: 4 }}>
            <Onlinerecharges />
          </div>
          <div className="row" style={{ paddingTop: 5, alignContent: "center", alignSelf: "center", borderRadius: 10 }}>
            <AboutUs />
          </div>
          {/* <div className="row" style={{ paddingTop: 5, alignContent: "center", alignSelf: "center", borderRadius: 10 }}>
            <ContactUs />
          </div> */}

          <div className='row' style={{ paddingTop: 5, alignContent: "center", alignSelf: "center" }}>
            {/* <h2 style={{ textAlign: "center", alignSelf: "center" }}>Customer Reviews</h2> */}
            <TestimonialsCarausel />
          </div>
        </div>
      </div>
    </section >
  );
}