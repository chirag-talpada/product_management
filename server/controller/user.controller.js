const { users, Sequelize } = require("./../models/index");

const getUsers=async (req,res)=>{
    try {
        let data = await users.findAll({});
        return res.status(200).json({
          success: true,
          count: data.length,
          data: data,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error,
        });
      }
}

module.exports={getUsers}