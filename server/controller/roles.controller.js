const { roles, Sequelize } = require("./../models/index");

const getRoles=async (req,res)=>{
    try {
        let data = await roles.findAll({});
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

module.exports={getRoles}