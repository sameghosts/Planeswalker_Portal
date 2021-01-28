'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      manaCost: {
        type: Sequelize.STRING
      },
      cmc: {
        type: Sequelize.STRING
      },
      colorIdentity: {
        type: Sequelize.STRING
      },
      rarity: {
        type: Sequelize.STRING
      },
      blockset: {
        allowNull: false,
        type: Sequelize.STRING
      },
      blocksetname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      multiverseId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      imageUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cards');
  }
};