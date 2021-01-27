'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_card_faves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_card_faves.init({
    userId: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_card_faves',
  });
  return user_card_faves;
};