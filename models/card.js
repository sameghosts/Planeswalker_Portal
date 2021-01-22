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