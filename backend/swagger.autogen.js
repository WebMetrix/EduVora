import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'EDUVORA API',
    description: 'API documentation for the EDUVORA Backend',
    version: '1.0.0'
  },
  servers: [
    {
      url: '/',
      description: 'Current environment server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token'
      }
    }
  },
  security: [
    {
      bearerAuth: [],
      cookieAuth: []
    }
  ]
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

const autogen = swaggerAutogen({ openapi: '3.0.0' });

autogen(outputFile, routes, doc).then(() => {
  console.log("Swagger documentation generated!");
});
