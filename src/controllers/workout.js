const dbClient = require("../utils/prisma");
const { sendDataResponse, sendMessageResponse } = require("../utils/responses");
const Workout = require("../domain/workout");

const createWorkout = async (req, res) => {
  const workoutToCreate = await Workout.fromJson(req.body);

  try {
    const createdWorkout = await workoutToCreate.save();

    return sendDataResponse(res, 200, createdWorkout.toJSON());
  } catch (e) {
    console.error("Something went wrong", e.message);

    return sendMessageResponse(res, 500, "Unable to create workout");
  }
};

const getWorkouts = async (req, res) => {
  try {
    const foundWorkouts = await dbClient.workout.findMany({
      include: { exercises: true },
    });

    return sendDataResponse(res, 200, { workouts: foundWorkouts });
  } catch (e) {
    console.error("Something went wrong", e.message);

    return sendMessageResponse(res, 500, "Unable to get workouts");
  }
};

const deleteWorkout = async (req, res) => {
  const id = Number(req.params.id);
  console.log("delete");
  try {
    await Workout.delete(id);

    sendDataResponse(res, 200);
  } catch (e) {
    console.error("Something went wrong", e.message);

    return sendMessageResponse(res, 500, "Unable to delete workout");
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  deleteWorkout,
};
