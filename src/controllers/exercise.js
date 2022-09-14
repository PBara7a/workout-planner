const dbClient = require("../utils/prisma");
const { sendDataResponse, sendMessageResponse } = require("../utils/responses");

const getExercises = async (req, res) => {
  try {
    const foundExercises = await dbClient.exercise.findMany({});

    return sendDataResponse(res, 200, { exercises: foundExercises });
  } catch (e) {
    console.error("Something went wrong", e.message);

    return sendMessageResponse(res, 500, "Unable to get exercises");
  }
};

module.exports = {
  getExercises,
};
