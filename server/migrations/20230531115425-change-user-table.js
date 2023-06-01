"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING,
      isEmail: true,
      unique: true,
      allowNull:false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('user','firstName',{
      type: Sequelize.STRING,
      isEmail: true,
      unique: true,
    })
  },
};
