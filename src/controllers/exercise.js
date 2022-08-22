const dbClient = require("../utils/prisma");

const getExercises = async (req, res) => {
  const exercises = await dbClient.exercise.findMany({});

  res.json({ exercises });
};

module.exports = {
  getExercises,
};
