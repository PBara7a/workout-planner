const dbClient = require("../utils/prisma");
const Workout = require("../domain/workout");

const create = async (req, res) => {
  const workoutToCreate = await Workout.fromJson(req.body);

  try {
    const createdWorkout = await workoutToCreate.save();

    res.status(200).json({ createdWorkout });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const workouts = async (req, res) => {
  try {
    const workouts = await dbClient.workout.findMany({
      include: { exercises: true },
    });

    res.status(200).json({ workouts });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const userWorkouts = async (req, res) => {
  const userId = Number(req.params.userId);

  const workouts = await dbClient.workout.findMany({
    where: {
      userId,
    },
    include: { exercises: true },
  });

  res.json({ workouts });
};

module.exports = {
  create,
  workouts,
  userWorkouts,
};
