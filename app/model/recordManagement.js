const sequelize = require("./sequelize.js")
const Sequelize = require('sequelize')
const recordManagement = sequelize.define('recordManagement', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  contact: Sequelize.STRING,
  status: Sequelize.STRING,
},
);
recordManagement.sync(); //创建表
module.exports = recordManagement;
