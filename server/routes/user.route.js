const { getUsers, createUser, getUser, updateUser } = require('../controller/user.controller');

const router=require('express').Router();


router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);



module.exports = router;