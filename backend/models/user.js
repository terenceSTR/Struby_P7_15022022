'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // définir l'association ici
      models.User.hasMany(models.Post, {
        onDelete: 'CASCADE',
        hooks: true
      });
      models.User.hasMany(models.Comment, { onDelete: 'CASCADE', hooks: true });
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
