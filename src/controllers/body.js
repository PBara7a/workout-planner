const dbClient = require("../utils/prisma");
const { sendDataResponse, sendMessageResponse } = require("../utils/responses");

const bodyparts = async (req, res) => {
  try {
    const foundBodyparts = await dbClient.bodyPart.findMany({});

    return sendDataResponse(res, 200, { bodyparts: foundBodyparts });
  } catch (e) {
    console.error("Something went wrong", e.message);

    return sendMessageResponse(res, 500, "Unable to get bodyparts");
  }
};

const targetMuscles = async (req, res) => {
  try {
    const foundTargets = await dbClient.target.findMany({});

    return sendDataResponse(res, 200, { targets: foundTargets });
  } catch (e) {
    console.error("Something went wrong", e.message);

    return sendMessageResponse(res, 500, "Unable to get targets");
  }
};

module.exports = {
  bodyparts,
  targetMuscles,
};
