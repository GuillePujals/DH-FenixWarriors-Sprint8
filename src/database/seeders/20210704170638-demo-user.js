'use strict';
const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Users', [{
      first_name: 'admin',
      last_name: 'admin',
      mail: 'admin@mail.com',
      telephone: 1145987632,
      avatar:'avatar.jpg',
      password: bcryptjs.hashSync('1234567', 10),
      
      createdAt: new Date(),
      updatedAt: new Date()
      }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {})
  }
}
