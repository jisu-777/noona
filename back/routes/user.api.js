const express = require("express");
const router = express.Router()
const userController = require("../controller/user.controller");

router.post("/",userController.createUser)
router.post("/login",userController.loginWithEmail)
module.exports = router

// 1. 회원가입 endpoint