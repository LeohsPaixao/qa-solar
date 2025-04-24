import chalk from 'chalk';
import dotenv from 'dotenv';
import app from './app.js';
import { setupSwagger } from './docs/swagger/config.js';

dotenv.config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    setupSwagger(app);
    app.listen(PORT, () => {
      console.log(chalk.green.bold(`\n🚀 Servidor iniciado com sucesso!`));
      console.log(chalk.blue(`🌍 URL: ${process.env.SERVER_URL}`));
      console.log(chalk.blue(`🌍 URL do Swagger: ${process.env.SERVER_URL}/api-docs`));
      console.log(chalk.yellow(`📅 Iniciado em: ${new Date().toLocaleString()}`));
    });
  } catch (error) {
    console.error(chalk.red.bold(`❌ Erro ao iniciar o servidor:`), error.message);
    process.exit(1);
  }
};

startServer();
