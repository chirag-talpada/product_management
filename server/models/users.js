'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    role_id: {
      type:DataTypes.INTEGER,
      references:{
        model:'roles',
        keyl:'id'
      }
    },
    username:{ 
      type:DataTypes.STRING,
      unique: true,
      allowNull:false
    },
    email:{ 
      type:DataTypes.STRING,
      isEmail:true,
      unique: true,
    },
    password:{ 
      type:DataTypes.STRING,
      allowNull:false
    },
    firstname:{ 
      type:DataTypes.STRING,
      
    },
    lastname:{ 
      type:DataTypes.STRING, 
    },
    address:{ 
      type:DataTypes.STRING,
      
    },
    phone:{ 
      type:DataTypes.STRING,
      validate: {
        is: /^[0-9]{10}$/i,
        
      }
      
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};