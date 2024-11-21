const express = require("express");
const { createUser, getUsers } = require("./controllers");
const router = express.Router();

// Rotas de Usuários
router.post("/users", createUser);
router.get("/users", getUsers);

module.exports = router;
