const { users, roles, Sequelize } = require("./../models/index");
const generator = require("generate-password");

const getUsers = async (req, res) => {
  try {
    let data = await users.findAll({
      attributes:['username','email'],
      include:{
        model:roles,
        required:true,
      },
      raw: true,
      
    });

    
    console.log(data);
    

    return res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const createUser = async (req, res) => {
  const {
    username,
    email,
    roles: roles_name,
    address,
    first_name,
    last_name,
    phone_number,
  } = req.body;

  
  const userData = {
    address,
    username,
    email,
    firstname:first_name,
    lastname:last_name,
    phone:phone_number
  };

  if (!username | !email | !roles_name) {
    return res.status(400).send({
      success: false,
      message: "Content can not be empty!",
    });
  }

  try {
    const password = generator.generate({
      length: 10,
      numbers: true,
    });

    const RoleID = await roles.findOne({
      attribute: ["id"],
      where: {
        name: roles_name,
      },
      raw: true,
    });

    const isEmailExits = await users.findOne({
      where: {
        email: email,
      },
      raw: true,
    });

    if (isEmailExits !== null) {
      return res.status(400).send({
        success: false,
        field: "email",
        message: "email is already exists!",
      });
    }

    const isUsernameExits = await users.findOne({
      where: {
        username: username,
      },
      raw: true,
    });

    if (isUsernameExits !== null) {
      return res.status(400).send({
        success: false,
        field: "username",
        message: "username is already exists!",
      });
    }

    const newUser = {
      ...userData,
      password,
      role_id: RoleID.id,
    };

    let data = await users.create(newUser);

    return res.status(201).json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

module.exports = { getUsers, createUser };
