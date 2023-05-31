'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type:Sequelize.INTEGER,
        references:{
          model:'roles',
          keyl:'id'
        }
      },
      username:{ 
        type:Sequelize.STRING,
        unique: true,
        allowNull:false
      },
      email:{ 
        type:Sequelize.STRING,
        isEmail:true,
        unique: true,
      },
      password:{ 
        type:Sequelize.STRING,
        allowNull:false
      },
      firstname:{ 
        type:Sequelize.STRING,
        
      },
      lastname:{ 
        type:Sequelize.STRING, 
      },
      address:{ 
        type:Sequelize.STRING,
        
      },
      phone:{ 
        type:Sequelize.STRING,
        validate: {
          is: /^[0-9]{10}$/i,
        }
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};