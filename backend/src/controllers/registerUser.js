const pool = require("../config/database");
const messages = require("../constants/messages");

module.exports.registerUser = async (req, res) => {
  const { fullName, socialName, document, docType, phone, email, password } = req.body;

  try {
    await pool.query(
      `INSERT INTO users (full_name, social_name, document, doc_type, phone, email, password) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [fullName, socialName, document, docType, phone, email, password]
    );

    res.status(201).json({ message: messages.success.userRegistered });
  } catch (error) {
    throw new Error(res.status(500).json({ message: messages.error.userRegistrationFailed }) + error.message);
  }
};
