'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      destination_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'destinations',
          key: 'id'
        }
      },
      address: {
        type: Sequelize.STRING
      },
      wifi: {
        type: Sequelize.TINYINT
      },
      pool: {
        type: Sequelize.TINYINT
      },
      parking: {
        type: Sequelize.TINYINT
      },
      barbecue: {
        type: Sequelize.TINYINT
      },
      price: {
        type: Sequelize.DECIMAL
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      n_of_people: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Properties');
  }
};