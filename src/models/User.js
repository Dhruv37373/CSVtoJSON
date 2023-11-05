const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 


const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.JSONB,
  },
  additional_info: {
    type: DataTypes.JSONB,
  },
},{
  tableName: 'Users',
  timestamps: false
});

module.exports = User;





