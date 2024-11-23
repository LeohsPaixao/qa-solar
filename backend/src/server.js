import chalk from 'chalk'
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config()

const PORT = process.env.PORT || 3001

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(chalk.green.bold(`\n🚀 Servidor iniciado com sucesso!`))
      console.log(chalk.blue(`🌍 URL: http://localhost:${PORT}`))
      console.log(chalk.yellow(`📅 Iniciado em: ${new Date().toLocaleString()}`))
    })
  } catch (error) {
    console.error(chalk.red.bold(`❌ Erro ao iniciar o servidor:`), error.message)
    process.exit(1)
  }
}

startServer()
