const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('Test', 'postgres', 'passwd',{
  host: 'localhost',
  dialect: 'postgres',
});

try{
  sequelize.authenticate();
  console.log('connection has been established successfully');
} catch(error){
  console.error('Unable to connect to the database:', error);
}

module.exports=sequelize

