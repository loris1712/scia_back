const { UserLogin, User } = require("../models"); // Importiamo i modelli Sequelize
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey"; // Change key for prod

// Login with Email & Password
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

    const token = jwt.sign({ userId: userLogin.user_id, email: userLogin.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login done", token });
  } catch (error) {
    console.error("❌ Error during login with email:", error);
    res.status(500).json({ error: "Error during the Login" });
  }
};

// Login with PIN
exports.loginWithPin = async (req, res) => {
  const { pin } = req.body;

  try {
    const userLogin = await UserLogin.findOne({
      where: { pin, pin_enabled: true },
      include: { model: User, as: "user" }, // Assumendo che UserLogin abbia una relazione con User
    });

    if (!userLogin || !userLogin.user) {
      return res.status(401).json({ error: "PIN is not valid or disabled." });
    }

    const token = jwt.sign({ userId: userLogin.user.id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Fast Login done", token });
  } catch (error) {
    console.error("❌ Error during login with PIN:", error);
    res.status(500).json({ error: "Error during the fast Login" });
  }
};

// Set or update PIN
exports.setPin = async (req, res) => {
  const { email, pin } = req.body;

  if (!/^\d{4}$/.test(pin)) {
    return res.status(400).json({ error: "The PIN must consist of 4 digits." });
  }

  try {
    const [updated] = await UserLogin.update({ pin }, { where: { email } });

    if (updated === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "PIN updated successfully." });
  } catch (error) {
    console.error("Error updating PIN:", error);
    res.status(500).json({ error: "Error updating PIN" });
  }
};
