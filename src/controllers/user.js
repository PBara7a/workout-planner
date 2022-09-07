const dbClient = require("../utils/prisma");
const bcrypt = require("bcrypt");

const create = async (req, res) => {
  const { username, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 8);

  const data = {
    username,
    password: passwordHash,
  };

  const user = await dbClient.user.create({ data });

  res.json({ user });
};

module.exports = {
  create,
};
