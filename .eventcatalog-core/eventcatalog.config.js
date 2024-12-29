import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/** @type {import('@eventcatalog/core/bin/eventcatalog.config').Config} */
export default {
  cId: '029abcc9-8bea-4315-a41d-a5faaa2c68dc',
  title: 'OurLogix',
  tagline: 'A comprehensive logistics and shipping management company',
  organizationName: 'OurLogix',
  homepageLink: 'https://eventcatalog.dev/',
  landingPage: '',
  editUrl: 'https://github.com/boyney123/eventcatalog-demo/edit/master',
  // By default set to false, add true to get urls ending in /
  trailingSlash: false,
  // Change to make the base url of the site different, by default https://{website}.com/docs,
  // changing to /company would be https://{website}.com/company/docs,
  base: '/',
  // Customize the logo, add your logo to public/ folder
  logo: {
    alt: 'EventCatalog Logo',
    src: '/logo.png',
    text: 'OurLogix',
  },
  docs: {
    sidebar: {
      // Should the sub heading be rendered in the docs sidebar?
      showPageHeadings: true,
    },
  },
  generators: [
    // Add single OpenAPI file to a domain
    [
      '@eventcatalog/generator-openapi',
      {
        services: [
          { path: path.join(__dirname, 'openapi-files', 'customers-service.yml'), id: 'customers-service', repository: 'iamzaker/ecommerce-core-services', mainBranch: 'main', asyncApiFileName: 'resolved-asyncapi.yml' },
          { path: path.join(__dirname, 'openapi-files', 'orders-service.yml'), id: 'orders-service', repository: 'iamzaker/ecommerce-core-services', mainBranch: 'main', asyncApiFileName: 'resolved-asyncapi.yml' },
          { path: path.join(__dirname, 'openapi-files', 'products-service.yml'), id: 'products-service', repository: 'iamzaker/ecommerce-core-services', mainBranch: 'main', asyncApiFileName: 'resolved-asyncapi.yml' },
        ],
        domain: { id: 'ecommerce', name: 'Ecommerce-Services', version: '0.0.1' },
        debug: true,
      },
    ],
    // Add many openapi files to a domain
    // [
    //   '@eventcatalog/generator-openapi',
    //   {
    //     services: [
    //       { path: path.join(__dirname, 'openapi-files', 'payment-service.yml'), id: 'payment-store' },
    //       { path: path.join(__dirname, 'openapi-files', 'fraud-detection-service.yml'), id: 'fraud-detection-service' },
    //     ],
    //     domain: { id: 'payment', name: 'Payment', version: '0.0.1' },
    //   },
    // ],
  ],
};
