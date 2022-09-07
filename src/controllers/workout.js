const dbClient = require("../utils/prisma");

const create = async (req, res) => {
  const { name, target, notes, exercises } = req.body;
  const data = { name, target, notes };

  data.exercises = {
    connect: exercises.map((ex) => ({
      id: ex,
    })),
  };

  const workout = await dbClient.workout.create({ data });

  res.json({ workout });
};

const workouts = async (req, res) => {
  const workouts = await dbClient.workout.findMany({
    include: { exercises: true },
  });

  res.json({ workouts });
};

module.exports = {
  create,
  workouts,
};
