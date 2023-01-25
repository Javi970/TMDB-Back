const Sequelize = require("sequelize")
const db = new Sequelize('tmdb_2', null,null, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  });
  
  module.exports= db;