const winston = require('winston')

const dateFormat = () => new Date(Date.now()).toLocaleString()
class LoggerService {
  constructor(path) {
    this.path = path
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.printf((info) => {
        let message = `${dateFormat()} | ${info.level} | ${info.message}`
        return info.obj
          ? `${message} | data : ${JSON.stringify(info.obj)}`
          : message
      }),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `${process.env.LOGGER_PATH}/${path}.log`,
        }),
      ],
    })
    this.logger = logger
  }
  async info(message, obj) {
    obj
      ? this.logger.log('info', message, { obj })
      : this.logger.log('info', message)
  }

  async error(message, obj) {
    obj
      ? this.logger.log('error', message, { obj })
      : this.logger.log('error', message)
  }
  async debug(message, obj) {
    obj
      ? this.logger.log('debug', message, { obj })
      : this.logger.log('debug', message)
  }
}

module.exports = LoggerService
