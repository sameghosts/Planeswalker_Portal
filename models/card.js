'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.card.hasMany(models.card_comment)
      models.card.hasMany(models.dual_n_split)
      models.card.hasMany(models.flavor)
      models.card.belongsToMany(models.user, {through: "user_card_faves"})
      models.card.belongsToMany(models.user, {through: "user_collections"})
      models.card.belongsToMany(models.deck, {through: "deck_cards"})
    }
  };
  card.init({
    name: DataTypes.STRING,
    manaCost: DataTypes.STRING,
    cmc: DataTypes.STRING,
    colorIdentity: DataTypes.STRING,
    rarity: DataTypes.STRING,
    blockset: DataTypes.STRING,
    blocksetname: DataTypes.STRING,
    multiverseId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'card',
  });
  return card;
};