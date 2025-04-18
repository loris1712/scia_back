const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Cart = sequelize.define("Cart", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  user_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  spare_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  quantity: { 
    type: DataTypes.INTEGER, 
    allowNull: true, 
    defaultValue: 1 
  },
  status: { 
    type: DataTypes.STRING, 
    allowNull: true, 
    defaultValue: "in_attesa" 
  }
}, {
  tableName: "Cart",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = Cart;
