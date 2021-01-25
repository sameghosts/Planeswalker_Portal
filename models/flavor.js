'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flavor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.flavor.belongsTo(models.card)
    }
  };
  flavor.init({
    cardId: DataTypes.INTEGER,
    flavorText: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'flavor',
  });
  return flavor;
};