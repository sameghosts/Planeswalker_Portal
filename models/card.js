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
      models.card.belongsToMany(models.user, {through: "user_card_fave"})
      models.card.belongsToMany(models.user, {through: "user_collection"})
      models.card.belongsToMany(models.deck, {through: "deck_card"})
    }
  };
  card.init({
    name: DataTypes.STRING,
    manaCost: DataTypes.STRING,
    cmc: DataTypes.STRING,
    colorIdentity: DataTypes.STRING,
    type: DataTypes.STRING,
    rarity: DataTypes.STRING,
    set: DataTypes.STRING,
    text: DataTypes.STRING,
    multiverseId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'card',
  });
  return card;
};