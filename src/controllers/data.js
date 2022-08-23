const dbClient = require("../utils/prisma");

const data = async (req, res) => {
  const exercises = await dbClient.exercise.findMany({});
  const bodyparts = await dbClient.bodyPart.findMany({});
  const targets = await dbClient.target.findMany({});
  const equipments = await dbClient.equipment.findMany({});

  res.json({ exercises, bodyparts, targets, equipments });
};

module.exports = {
  data,
};
