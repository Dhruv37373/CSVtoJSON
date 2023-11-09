const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 

const User = sequelize.define('User', {
  name: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.JSONB,
  },
  gender: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'Users',
  timestamps: false
});


module.exports = User;




