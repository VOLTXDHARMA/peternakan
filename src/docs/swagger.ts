import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Boilerplate',
            version: '1.0.0',
            description: 'Dokumentasi API with Express and TypeScript'
        },
        servers: [
            {
                url: 'http://localhost:3000/api'
            }
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
    },
    apis: ['./src/routes/auth.routes.ts', './src/routes/user.routes.ts', './src/routes/umkm.routes.ts', './src/routes/ternak.routes.ts', './src/routes/pelatihan.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;