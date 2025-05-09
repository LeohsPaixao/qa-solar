import chalk from 'chalk';
import dotenv from 'dotenv';
import app from './app.js';
import { setupSwagger } from './docs/swagger/config.js';

dotenv.config();

const API_URL = process.env.API_URL;

const startServer = async () => {
  try {
    setupSwagger(app);
    app.listen(3001, () => {
      console.log(chalk.green.bold(`\n🚀 Servidor iniciado com sucesso!`));
      console.log(chalk.blue(`🌍 URL: ${API_URL}`));
      console.log(chalk.blue(`🌍 URL do Swagger: ${API_URL}/api-docs`));
      console.log(chalk.yellow(`📅 Iniciado em: ${new Date().toLocaleString()}`));
    });
  } catch (error) {
    console.error(chalk.red.bold(`❌ Erro ao iniciar o servidor:`), error.message);
    process.exit(1);
  }
};

startServer();
