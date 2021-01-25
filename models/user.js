'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.card_comment)
      models.user.hasMany(models.deck_comment)
      models.user.hasMany(models.deck)
      models.user.belongsToMany(models.card, {through: "user_card_fave"})
      models.user.belongsToMany(models.deck, {through: "user_deck"})
      models.user.belongsToMany(models.card, {through: "user_collection"})

    }
    validPassword(typedPassword) {
      let isValid = bcrypt.compareSync(typedPassword, this.password);
      return isValid;
    }
    toJSON () {
      let userData = this.get();
      delete userData.password;
      return userData;
    }
  };
  user.init({
    email: { 
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    
    },
    username: { 
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    name: { 
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    fav: { 
      type: DataTypes.INTEGER,
      },
    password: { 
      type: DataTypes.STRING,
      validate:{
        len: {
          args: [8, 99],
          msg: 'password must be between 9 and 99 characters'
        }, 
        notContains: {
          args: this.name,
          msg: 'Password cannot contain your name'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (pendingUser, options) => {
        // check if there is a user being passed AND that that user has a password
        if (pendingUser && pendingUser.password) {
          //if thats the case hash the pass
          let hash = bcrypt.hashSync(pendingUser.password, 12);
          //store the has as the user's pass
          pendingUser.password = hash
        }
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};