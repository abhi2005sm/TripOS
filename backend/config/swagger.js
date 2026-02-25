import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TripOS API',
            version: '1.0.0',
            description: 'Production-ready travel planning API',
        },
        servers: [
            {
                url: process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
                description: process.env.NODE_ENV === 'production' ? 'Production' : 'Development',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs;
