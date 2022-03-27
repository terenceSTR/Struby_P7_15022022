const { Sequelize } = require('sequelize');

const db = new Sequelize(
  {
    dialect: "mysql",
    host: "127.0.0.1",        
    username: "root",
    password: "17082001",
    database: "groupomania"    
  },
);
db.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = db;
