import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import AboutPage from '@site/src/components/AboutPage';

import Heading from '@theme/Heading';
import styles from '../index.module.css';

 
export default function about() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="About Us"
      description="Description will go into a meta tag in <head />"> 
      <main>
        <AboutPage />
      </main>
    </Layout>
  );
}
