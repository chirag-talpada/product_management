const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
