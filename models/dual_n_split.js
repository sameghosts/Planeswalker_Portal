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
      models.dual_n_split.belongsTo(models.card)

    }
  };
  dual_n_split.init({
    cardId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    multiverseId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dual_n_split',
  });
  return dual_n_split;
};