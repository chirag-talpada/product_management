'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users',[{
      role_id:3,
      username:'chirag123',
      email:"chirag@gmail.com",
      password:"123",
      firstname:'talpada',
      lastname:'chirag',
      address:"nadiad",
      phone:"7984296391",
      createdAt:new Date (),
      updatedAt:new Date ()
    },{
      role_id:1,
      username:'kartik123',
      email:"kartik@gmail.com",
      password:"123",
      firstname:'gajjar',
      lastname:'kartik',
      address:"nadiad",
      phone:"8484205391",
      createdAt:new Date (),
      updatedAt:new Date ()
    },{
      role_id:1,
      username:'tosif123',
      email:"tosif@gmail.com",
      password:"123",
      firstname:'khan',
      lastname:'tosif',
      address:"anand",
      phone:"9727645765",
      createdAt:new Date (),
      updatedAt:new Date ()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
