const dbClient = require("../utils/prisma");
const bcrypt = require("bcrypt");

class User {
  constructor(id, username, password, workouts) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.workouts = workouts;
  }

  static async fromJson({ username, password }) {
    let passwordHash;
    if (password) {
      passwordHash = await bcrypt.hash(password, 8);
    }

    return new User(null, username, passwordHash, null);
  }

  static fromDb(user) {
    return new User(user.id, user.username, user.password, user.workouts);
  }

  toJSON() {
    return {
      user: {
        id: this.id,
        username: this.username,
        password: this.password,
        workouts: this.workouts,
      },
    };
  }

  async save() {
    const createdUser = await dbClient.user.create({
      data: {
        username: this.username,
        password: this.password,
      },
    });

    return User.fromDb(createdUser);
  }

  static async findUserWorkouts(id) {
    const foundUser = await User._findByUnique("id", id);
    return foundUser.workouts;
  }

  static async findById(id) {
    return User._findByUnique("id", id);
  }

  static async findByUsername(username) {
    return User._findByUnique("username", username);
  }

  static async _findByUnique(key, value) {
    const foundUser = await dbClient.user.findUnique({
      where: {
        [key]: value,
      },
      include: {
        workouts: {
          include: {
            exercises: true,
          },
        },
      },
    });

    if (foundUser) {
      return User.fromDb(foundUser);
    }

    return null;
  }
}

module.exports = User;
