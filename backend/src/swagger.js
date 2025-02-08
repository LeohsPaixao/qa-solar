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
        url: process.env.SERVER_URL,
        description: 'Servidor de Desenvolvimento',
      },
    ],
    tags: [
      {
        name: 'Autenticação',
        description:
          "Endpoints para login e autenticação. Utilize o /login para gerar o token JWT e insira-o com o prefixo 'Bearer' no header Authorization.",
      },
      {
        name: 'Usuários',
        description: 'Endpoints para gerenciamento dos usuários.',
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
  apis: ['./src/controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
