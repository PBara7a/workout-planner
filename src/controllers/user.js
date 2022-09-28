const { sendDataResponse, sendMessageResponse } = require("../utils/responses");
const User = require("../domain/user");

const user = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const foundUser = await User.findById(id);

    if (!foundUser) {
      return sendMessageResponse(res, 404, "User not found");
    }

    return sendDataResponse(res, 200, foundUser);
  } catch (e) {
    console.error("Something went wrong", e.message);

    return sendMessageResponse(res, 500, "Unable to get user");
  }
};

const create = async (req, res) => {
  const userToCreate = await User.fromJson(req.body);

  try {
    const existingUser = await User.findByUsername(userToCreate.username);

    if (existingUser) {
      return sendMessageResponse(res, 400, "Username already in use");
    }

    const createdUser = await userToCreate.save();

    return sendDataResponse(res, 200, createdUser.toJSON());
  } catch (e) {
    console.error("Something went wrong", e.message);

    return sendMessageResponse(res, 500, "Unable to create user");
  }
};

const getUserWorkouts = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const foundUserWorkouts = await User.findUserWorkouts(id);

    return sendDataResponse(res, 200, foundUserWorkouts);
  } catch (e) {
    console.error("Something went wrong", e.message);

    return sendMessageResponse(res, 500, "Unable to find user workouts");
  }
};

module.exports = {
  user,
  create,
  getUserWorkouts,
};
