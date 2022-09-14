const { sendDataResponse, sendMessageResponse } = require("../utils/responses");
const User = require("../domain/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiry = process.env.JWT_EXPIRY;

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return sendMessageResponse(
      res,
      401,
      "Invalid email or/and password provided"
    );
  }

  try {
    const foundUser = await User.findByUsername(username);
    const isCredentialsValid = await validateCredentials(password, foundUser);

    if (!isCredentialsValid) {
      return sendMessageResponse(
        res,
        401,
        "Invalid email or/and password provided"
      );
    }

    const token = generateJwt(foundUser.id);

    return sendDataResponse(res, 200, { ...foundUser.toJSON(), token });
  } catch (e) {
    console.error("Something went wrong", e.message);

    return sendMessageResponse(res, 500, "Unable to process request");
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
