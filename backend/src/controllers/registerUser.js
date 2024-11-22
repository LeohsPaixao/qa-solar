const pool = require("../config/database");

module.exports.registerUser = async (req, res) => {
  const { fullName, socialName, document, docType, phone, email, password } = req.body;

  try {
    await pool.query(
      `INSERT INTO users (full_name, social_name, document, doc_type, phone, email, password) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [fullName, socialName, document, docType, phone, email, password]
    );

    res.status(201).json({ message: "Usuário cadastrado no QA Solar com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao tentar cadastrar o usuário." });
  }
};
