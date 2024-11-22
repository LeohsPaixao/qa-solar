const express = require("express");

const { registerUser } = require("../controllers/registerUser");
const { loginUser } = require('../controllers/loginUser');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
