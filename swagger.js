const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'seminario-api',
    description: 'Aplicación para Seminario 1 - Only in localhost mode',
  },
  host: 'localhost:4000',
  schemes: ['http'],
};

swaggerAutogen('./swagger.json', ['routes/*.js'], doc);