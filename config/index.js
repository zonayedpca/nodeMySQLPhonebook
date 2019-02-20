const expressConfigs = require('./expressConfigs'),
      expressMiddlewares = require('./expressMiddlewares');

module.exports = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  expressConfigs,
  expressMiddlewares
}