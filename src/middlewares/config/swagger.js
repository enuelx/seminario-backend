const PORT = process.env.HTTP_PORT || 3000;

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Aplicación para Seminario 1',
        version: '1.0.0',
        contact: {
            email: 'emma.maidana@gmail.com'
        }
    },
    servers: [
        {
            url: `http://localhost:${PORT}`
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
};

module.exports = {
    swaggerDefinition,
    basePath: "/",
    apis: [
        '../../routes/*.js'
    ]
}
