import dotenv from 'dotenv';
import winston from 'winston';
import app from './app.ts';

dotenv.config();

const PORT = process.env.PORT || 3001;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
  ),
  transports: [new winston.transports.Console()],
});

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      logger.info(`🚀 Servidor iniciado com sucesso!`);
      logger.info(`🌍 URL: http://localhost:${PORT}`);
      logger.info(`📅 Iniciado em: ${new Date().toLocaleString()}`);
    });
  } catch (error: any) {
    logger.error(`❌ Erro ao iniciar o servidor: ${error.message}`);
    process.exit(1);
  }
};

startServer();
