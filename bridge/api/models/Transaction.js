const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  escrowId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Escrows', 
      key: 'id'
    }
  },
  transactionType: {
    type: DataTypes.ENUM('deposit', 'fee_deduction', 'payment_release', 'refund'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  recipientType: {
    type: DataTypes.ENUM('platform', 'client', 'staff', 'agency'),
    allowNull: false
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending'
  },
  referenceNumber: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Transaction;
