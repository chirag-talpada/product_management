const { users, roles, Sequelize } = require("./../models/index");
const generator = require("generate-password");

const getUsers = async (req, res) => {
  try {
    let data = await users.findAll({
      attributes: [
        "id",
        "username",
        "email",
        "firstname",
        "lastname",
        "address",
        "phone",
      ],
      include: {
        model: roles,
        required: true,
        attributes: ["name"],
      },
      raw: true,
      order: [["id", "ASC"]],
    });

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

const getUser = async (req, res) => {
  try {
    const UserID = Number(req.params.id);

    if (!UserID) {
      return res.status(400).send({
        success: false,
        message: "ID not found!",
      });
    }

    let data = await users.findByPk(UserID, {
      attributes: [
        "id",
        "username",
        "email",
        "firstname",
        "lastname",
        "address",
        "phone",
      ],
      include: {
        model: roles,
        required: true,
        attributes: ["name"],
      },
      raw: true,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const createUser = async (req, res) => {
  try {
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
      firstname: first_name,
      lastname: last_name,
      phone: phone_number,
    };

    if (!username | !email | !roles_name) {
      return res.status(400).send({
        success: false,
        message: "Content can not be empty!",
      });
    }

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

    if (!RoleID.id) {
      throw new Error("Role is invalid");
    }

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
    data = JSON.parse(JSON.stringify(data));

    delete data.password;

    console.log(data);

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

const updateUser = async (req, res) => {
  try {
    let userID = req.params.id;

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
      firstname: first_name,
      lastname: last_name,
      phone: phone_number,
    };

    if (!userID) {
      return res.status(400).send({
        success: false,
        message: "ID not found!",
      });
    }

    if (!username | !email | !roles_name) {
      return res.status(400).send({
        success: false,
        message: "Content can not be empty!",
      });
    }

    const RoleID = await roles.findOne({
      attribute: ["id"],
      where: {
        name: roles_name,
      },
      raw: true,
    });

    if (!RoleID.id) {
      throw new Error("Role is invalid");
    }

    const isEmailExits = await users.findOne({
      where: {
        [Sequelize.Op.and]: [
          {
            email: {
              [Sequelize.Op.eq]: email,
            },
          },
          {
            id: {
              [Sequelize.Op.ne]: userID,
            },
          },
        ],
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
        [Sequelize.Op.and]: [
          {
            username: {
              [Sequelize.Op.eq]: username,
            },
          },
          {
            id: {
              [Sequelize.Op.ne]: userID,
            },
          },
        ],
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
      role_id: RoleID.id,
    };

    let [data] = await users.update(newUser, {
      where: {
        id: userID,
      },
    });

    if (data === 0) {
      return res.status(200).json({
        success: false,
        error: "No user found with this id",
      });
    }

    return res.status(201).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

const deleteUser = async (req, res) => {

  try {
    let userID = Number(req.params.id);

    if (!userID) {
      return res.status(400).send({
        success: false,
        message: "ID not found!",
      });
    }

    let data = await users.destroy({
      where: {
        id: userID,
      },
      
    });
    
  
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `User with id ${userID} is deleted`,
      });
    }
    return res.status(200).json({
      success: false,
      message: `User with id ${userID} is not present.`,
    });


  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      error: 'something went wrong',
    });
  }
};

module.exports = { getUsers, createUser, getUser, updateUser, deleteUser };
