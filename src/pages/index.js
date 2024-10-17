import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomePage from '@site/src/components/HomePage';
import { FloatButton } from 'antd'; 

import { useHistory } from '@docusaurus/router';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const history = useHistory(); 
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <p style={{ color: "white", }} >{siteConfig.title}</p>
        </Heading>
        <div className='row' style={{ fontFamily: "monospace", fontSize: 15, color: "white", }}>
          <p style={{ fontSize: 30, color: "white", }} >
            We provide diverse online services like form filling, payments, browsing, ticketing, resume creation, and mobile recharge, focusing on exam assistance.
          </p>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
      <Layout title={siteConfig.title} description="Description will go into a meta tag in <head />">
        <main style={{ backgroundColor: "#F0F5F7" }}>
          <HomepageHeader />
          <HomePage />
        </main>
      </Layout>
  );
}