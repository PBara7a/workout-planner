const dbClient = require("../utils/prisma");

class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  static fromJson({ username, password }) {
    return new User(null, username, password);
  }

  static fromDb(user) {
    return new User(user.id, user.username, user.password);
  }

  toJSON() {
    return {
      user: {
        id: this.id,
        username: this.username,
        password: this.password,
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

  static async findById(id) {
    return User._findByUnique("id", id);
  }

  static async _findByUnique(key, value) {
    const foundUser = await dbClient.user.findUnique({
      where: {
        [key]: value,
      },
      include: {
        workouts: true,
      },
    });

    if (foundUser) {
      return User.fromDb(foundUser);
    }

    return null;
  }
}

module.exports = User;
