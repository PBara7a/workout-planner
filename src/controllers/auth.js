const dbClient = require("../utils/prisma");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiry = process.env.JWT_EXPIRY;

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ error: "Invalid username and/or password" });
  }

  try {
    const user = await dbClient.user.findUnique({ where: { username } });
    const isCredentialsValid = await validateCredentials(password, user);

    if (!isCredentialsValid) {
      return res.json({ error: "Invalid username and/or password" });
    }

    delete user.password;

    const token = generateJwt(user.id);

    return res.json({ user, token });
  } catch (e) {
    console.error(e);
    return res.json({ error: "Unable to login" });
  }
};

const generateJwt = (userId) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: jwtExpiry });
};

const validateCredentials = async (password, user) => {
  if (!user) return false;

  if (!password) return false;

  const isPasswordValid = await bcrypt.compare(password, user.password);

  return isPasswordValid;
};

module.exports = {
  login,
};
