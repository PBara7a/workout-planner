const dbClient = require("../utils/prisma");

const bodyparts = async (req, res) => {
  const bodyparts = await dbClient.bodyPart.findMany({});

  res.json({ bodyparts });
};

const targetMuscles = async (req, res) => {
  const targets = await dbClient.target.findMany({});

  res.json({ targets });
};

module.exports = {
  bodyparts,
  targetMuscles,
};
