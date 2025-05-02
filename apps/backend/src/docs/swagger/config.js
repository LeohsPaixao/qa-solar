import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'API do Monorepo',
      version: '1.0.0',
      description:
        'Documentação da API do backend. Aqui você encontrará todos os detalhes dos endpoints, exemplos de payloads e informações de segurança, facilitando o desenvolvimento e o consumo da API.',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            "Para gerar o token JWT, faça login através do endpoint /login passando as credenciais válidas. O token retornado deverá ser utilizado com o prefixo 'Bearer' no header Authorization.",
        },
      },
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            nome: {
              type: 'string',
              example: 'João da Silva',
            },
            email: {
              type: 'string',
              example: 'joao.silva@example.com',
            },
          },
        },
      },
    },
  },
  apis: ['./src/docs/swagger/paths/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
