const dbClient = require("../utils/prisma");
const { sendDataResponse, sendMessageResponse } = require("../utils/responses");

const equipments = async (req, res) => {
  try {
    const foundEquipments = await dbClient.equipment.findMany({});

    return sendDataResponse(res, 200, { equipments: foundEquipments });
  } catch (e) {
    console.error("Something went wrong", e.message);

    return sendMessageResponse(res, 500, "Unable to get equipments");
  }
};

module.exports = {
  equipments,
};
