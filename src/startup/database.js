const mongoose = require('mongoose')
const logger = require('../tools/logger.config')
const config = require('config')

/**
 * Tenta reestabelecer a conexão do banco de dados
 * @param {String} url url da conexão do banco de dados
 */
const tryReconect = (url) => {
  setTimeout(
    () => {
      mongoose.connect(
        url,
        config.get('database_options'),
      )
    },
    5000, // tenta reconectar a cada 5 segundos
  )
}

module.exports = () => {
  // DB Connection
  // mongoose.connect(environment.db.url, { useNewUrlParser: true })
  mongoose.connect(config.get('db.url'), { useNewUrlParser: true })
    .then(() => logger.info('Connected to MongoDB'))


  // Evento de erro do mongoose
  mongoose.connection.on('error', (e) => {
    logger.info(`db: mongodb error ${e}`, 'DB')
    tryReconect(config.get('db.url'))
  })

  // Evento ativado quando o banco de dados é conectado
  mongoose.connection.on('connected', () => {
    logger.info(`db: mongodb is connected: ${config.get('db.url')}`, 'DB')
  })

  // Evento ativado quando o banco de dados é desconectando
  mongoose.connection.on('disconnecting', () => {
    logger.info('db: mongodb is disconnecting!!!', 'DB')
  })

  // Evento ativado quando o banco de dados é desconectado
  mongoose.connection.on('disconnected', () => {
    logger.info('db: mongodb is disconnected!!!', 'DB')
  })

  // Evento ativado quando o banco de dados é reconectado
  mongoose.connection.on('reconnected', () => {
    logger.info(`db: mongodb is reconnected: ${config.get('db.url')}`, 'DB')
  })

  // Evento ativado quando ocorre timeout na conexão com o banco
  mongoose.connection.on('timeout', (e) => {
    logger.info(`db: mongodb timeout ${e}`, 'DB')
    tryReconect(config.get('db.url'))
  })
}