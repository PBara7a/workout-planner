const emailClient = require("../utils/emailClient");
const createEmailContent = require("../utils/createEmailContent");

const send = async (req, res) => {
  const { email, workout } = req.body;

  try {
    const msg = await createEmailContent(workout, email);
    emailClient.send(msg);

    res.json({ email: "Sent" });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

module.exports = {
  send,
};
