const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ShiftSkill = sequelize.define('ShiftSkill', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  shiftId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Shifts',
      key: 'id'
    }
  },
  skillId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Skills', 
      key: 'id'
    }
  }
});

module.exports = ShiftSkill;
