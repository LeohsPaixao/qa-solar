const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

require("dotenv").config();

const app = express();
const port = 3001;

// Configuração do CORS (para permitir que o frontend acesse o backend)
app.use(cors());
app.use(bodyParser.json());

// Configuração do cliente PostgreSQL
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_SCHEMA,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

// Endpoint para criar um novo usuário
app.post("/register", async (req, res) => {
  const { fullName, socialName, document, docType, phone, email, password } = req.body;

  try {
    await pool.query(
      `INSERT INTO users (full_name, social_name, document, doc_type, phone, email, password) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [fullName, socialName, document, docType, phone, email, password]
    );

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao inserir no banco de dados:", error);
    res.status(500).json({ message: "Erro ao registrar o usuário." });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
