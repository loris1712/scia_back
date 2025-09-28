const { UserLogin, User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = "supersecretkey";

exports.loginWithEmail = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userLogin = await UserLogin.findOne({ where: { email } });

    if (!userLogin) {
      return res.status(401).json({ error: "Credentials are not valid." });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: "Credentials are not valid." });
    }

    const token = jwt.sign(
      { userId: userLogin.user_id, email: userLogin.email },
      process.env.SECRET_KEY,
      { expiresIn: '2h' }
    );

    return res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
};

exports.loginWithPin = async (req, res) => {
  const { pin } = req.body;

  try {
    const userLogin = await UserLogin.findOne({
      where: { pin, pin_enabled: true },
      include: { model: User, as: "user" },
    });

    if (!userLogin || !userLogin.user) {
      return res.status(401).json({ error: "PIN non valido o disabilitato." });
    }

    const token = jwt.sign(
      { userId: userLogin.user.id },
      process.env.SECRET_KEY,
      { expiresIn: '2h' }
    );
    
    return res.json({
      message: "Login PIN effettuato",
      token,
    });
  } catch (error) {
    console.error("Errore durante il login con PIN:", error);
    res.status(500).json({ error: "Errore durante il login rapido" });
  }
};