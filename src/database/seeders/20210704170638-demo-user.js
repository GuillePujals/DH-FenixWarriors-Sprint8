'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Users', [{
      first_name: 'John Doe',
      last_name: 'Doe',
      mail: 'example@example.com',
      telephone: 1145987632,
      avatar:'/img/users/1624311252533_img.jpg',
      password: '1234567',
      admin: '1',
      casa: '1',
      departamento: '1',
      hotel: '1',
      hosteria: '1',
      aparts: '1',
      createdAt: new Date(),
      updatedAt: new Date()
      }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {})
  }
}
