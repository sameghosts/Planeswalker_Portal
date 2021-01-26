'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_decks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_decks.init({
    userId: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_decks',
  });
  return user_decks;
};