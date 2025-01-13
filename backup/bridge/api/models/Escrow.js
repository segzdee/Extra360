const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Escrow = sequelize.define('Escrow', {
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
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id'
    }
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  clientFeeAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  staffFeeAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  agencyFeeAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('held', 'processing', 'released', 'refunded'),
    defaultValue: 'held'
  }
});

module.exports = Escrow;
