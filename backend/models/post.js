'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
   /**
      * Méthode d'assistance pour définir des associations.
      * Cette méthode ne fait pas partie du cycle de vie de Sequelize.
      * Le fichier `models/index` appellera cette méthode automatiquement.
      */
    static associate(models) {
      // définir l'association ici
      models.Post.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      models.Post.hasMany(models.Comment, {
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
