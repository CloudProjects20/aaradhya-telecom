import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import NewsLetter from '@site/src/components/NewsLetterPage';

export default function ContactUs() {
  const { siteConfig } = useDocusaurusContext();
  console.log(siteConfig.title)
  return (
    <Layout
      title="Contact Us"
      description="Description will go into a meta tag in <head />">
      <div className='container'>
        <main >
          <NewsLetter />
        </main>
      </div>
    </Layout>
  );
}
