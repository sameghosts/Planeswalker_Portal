'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dual_n_split extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  dual_n_split.init({
    cardId: DataTypes.INTEGER,
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
    modelName: 'dual_n_split',
  });
  return dual_n_split;
};