// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Aaradhya Telecom & Net Cafe',
  tagline: '117/N/23, Nahar Patti, Kakadeo, Kanpur, Uttar Pradesh 208025',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://aaradhyatelecom.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  scripts: [{
    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9916894688113130',
    async: true,
    crossorigin:"anonymous"
  }],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        // { name: "google-adsense-account", content: "ca-pub-9916894688113130" },
        { name: "Online Form Filling Services", content: "Get expert assistance for filling online forms for competitive examinations. Secure and hassle-free service." },
        { "name": "Competitive Examinations Support", "content": "Expert guidance and support for competitive examinations. Simplify the exam process with our services." },
        { "name": "Professional Form Filling Assistance", "content": "Need help with online form filling? We offer expert assistance to make the process easy and efficient." },
        { "name": "Online Application Support", "content": "Receive comprehensive support for online applications. Our experts ensure a smooth and error-free submission process." },
        { "name": "Competitive Exam Forms Assistance", "content": "Assistance with filling competitive exam forms. Ensure accuracy and completeness with our expert guidance." },
        { "name": "Exam Registration Services", "content": "Simplify exam registration with our services. We handle the process efficiently, saving you time and effort." },
        { "name": "Secure Online Payments", "content": "Make secure online payments with confidence. Our robust security measures protect your transactions at every step." },
        { "name": "High-Speed Internet Access", "content": "Access high-speed internet for seamless net surfing. Stay connected and browse with ease." },
        { "name": "Railway Ticket Reservation", "content": "Effortlessly book railway tickets online. Secure your seats and plan your journey conveniently." },
        { "name": "Train Ticket Booking", "content": "Book train tickets online with ease. Enjoy hassle-free booking and secure your seats in advance." },
        { "name": "Professional Resume Creation", "content": "Create professional resumes with our expert assistance. Stand out to employers with a polished and impressive resume." },
        { "name": "Professional Resume Writing", "content": "Receive professional resume writing services to showcase your skills and experience effectively. Impress employers and land your dream job." },
        { "name": "Online Recharges", "content": "Top up your mobile phone or other services online without any hassle. Stay connected wherever you go." },
        { "name": "Mobile Recharge Services", "content": "Get quick and convenient mobile recharge services online. Stay connected without interruption." },
        { "name": "DTH Recharge", "content": "Recharge your DTH services online with ease. Enjoy uninterrupted entertainment with hassle-free recharges." },
        { "name": "Electricity Meter Application", "content": "Apply for electricity meter connections online smoothly. We assist you through the entire application process." },
        { "name": "Meter Connection Services", "content": "Need a new electricity meter connection? We provide efficient and reliable services to get you connected without delay." },
        { "name": "Utility Bill Payments", "content": "Make hassle-free utility bill payments online. Secure your transactions and manage your expenses conveniently." }
      ],
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      // announcementBar: {
      //   id: 'support_us',
      //   content: `⭐️ If you like Aaradhya Telecom & Net Cafe, give it a star on <a target="_blank" rel="noopener noreferrer" href="`,
      //   backgroundColor: '#fafbfc',
      //   textColor: '#091E42',
      //   isCloseable: false,
      // },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: true
      },
      themeConfig: {
        customCss: require.resolve('./src/css/custom.css'),
      },
      navbar: {
        title: 'Aaradhya Telecom & Net Cafe',
        hideOnScroll: false,
        style: 'primary',
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'right',
          //   label: 'Students Corner',
          // },
          // { to: '/featured', label: 'Featured Content', position: 'left' },
          // { to: '/testimonials', label: 'Testimonials', position: 'left' },
          // { to: '/announcements', label: 'News & Announcements', position: 'left' },
          { to: '/#about', label: 'About Us', position: 'right' },
          { to: '/contact', label: 'Contact Us', position: 'right' },

          //RIGHT
          // { to: '/blog', label: 'Blog', position: 'right' },
          // { type: 'search', position: 'right' },
          // { type: 'html', position: 'right',  value: '<button>Please Provide your feedback</button>' },
          // {
          //   href: 'https://github.com/facebook/docusaurus',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: 'Tutorial',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Stack Overflow',
          //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //     },
          //     {
          //       label: 'Discord',
          //       href: 'https://discordapp.com/invite/docusaurus',
          //     },
          //     {
          //       label: 'Twitter',
          //       href: 'https://twitter.com/docusaurus',
          //     },
          //   ],
          // },
          // {
          //   title: 'More',
          //   items: [
          //     {
          //       label: 'Contact Us',
          //       to: '/#ContactUs', 
          //     }
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Aaradhya Telecom & Net Cafe, 117/N/23, Nahar Patti, Kakadeo, Kanpur, Uttar Pradesh - 208025, Call Us: +91-8090346822`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
