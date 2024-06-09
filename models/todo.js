'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {foreignKey: 'user_id'});
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Todo',
    paranoid: true, // Enable soft delete
    timestamps: true // Ensure timestamps are enabled
  });
  return Todo;
};
