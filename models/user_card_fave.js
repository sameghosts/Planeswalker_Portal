'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_card_fave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_card_fave.init({
    userId: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_card_fave',
  });
  return user_card_fave;
};