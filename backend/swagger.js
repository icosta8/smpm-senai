const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const outputFile = './src/swagger_output.json';
const endpointsFiles = [
  './index.js',                 
  './src/routes/userRoutes.js'      
];

const doc = {
  info: {
    title: 'API SMPM (Compass)',
    description: 'Documentação automática gerada com swagger-autogen',
    version: '1.0.0'
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Ambiente local (Compass)' }
  ],
  tags: [
    {
      name: 'Usuários',
      description: 'Operações CRUD de usuários'
    }
  ]
};

// Gera a documentação
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Documentação Swagger gerada: swagger_output.json');
});
