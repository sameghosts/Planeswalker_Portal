'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_deck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_deck.init({
    userId: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_deck',
  });
  return user_deck;
};