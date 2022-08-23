const dbClient = require("../utils/prisma");

const equipments = async (req, res) => {
  const equipments = await dbClient.equipment.findMany({});

  res.json({ equipments });
};

module.exports = {
  equipments,
};
