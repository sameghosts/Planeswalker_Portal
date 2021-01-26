'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class deck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.deck.belongsTo(models.user)
      models.deck.hasMany(models.deck_comment)
      models.deck.belongsToMany(models.user, {through: "user_decks"})
      models.deck.belongsToMany(models.card, {through: "deck_cards"})
    }
  };
  deck.init({
    name: DataTypes.STRING,
    format: DataTypes.STRING,
    description: DataTypes.STRING,
    creator: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'deck',
  });
  return deck;
};