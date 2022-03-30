'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
      * Méthode d'assistance pour définir des associations.
      * Le fichier `models/index` appellera cette méthode automatiquement.
      */
    static associate(models) {
  // définir l'association ici
      models.Comment.belongsTo(models.Post, {
        foreignKey: 'postId'
      })
      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  };
  Comment.init({
    content: DataTypes.TEXT,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
