import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ContactPage from '@site/src/components/ContactPage';

export default function ContactUs() {
  const { siteConfig } = useDocusaurusContext(); 
  return (
    <Layout
      title="Contact Us"
      description="Description will go into a meta tag in <head />">
      <main className='container'>
        <ContactPage />
      </main>
    </Layout>
  );
}
