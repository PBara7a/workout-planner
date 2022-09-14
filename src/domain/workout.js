const dbClient = require("../utils/prisma");

class Workout {
  constructor(id, name, target, notes, exercises, userId) {
    this.id = id;
    this.name = name;
    this.target = target;
    this.notes = notes;
    this.exercises = exercises;
    this.userId = userId;
  }

  static fromJson({ name, target, notes, exercises, user_id }) {
    return new Workout(null, name, target, notes, exercises, user_id);
  }

  static fromDb(workout) {
    return new Workout(
      workout.id,
      workout.name,
      workout.target,
      workout.notes,
      workout.exercises,
      workout.userId
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      target: this.target,
      notes: this.notes,
      exercises: this.exercises,
      user_id: this.userId,
    };
  }

  async save() {
    const createdWorkout = await dbClient.workout.create({
      data: {
        name: this.name,
        target: this.target,
        notes: this.notes,
        userId: this.userId,
        exercises: {
          connect: this.exercises.map((ex) => ({ id: ex })),
        },
      },
      include: {
        exercises: true,
      },
    });

    return Workout.fromDb(createdWorkout);
  }

  static async findById(id) {
    return Workout._findByUnique("id", id);
  }

  static async _findByUnique(key, value) {
    const foundWorkout = await dbClient.workout.findUnique({
      where: {
        [key]: value,
      },
      include: {
        exercises: true,
      },
    });

    if (foundWorkout) {
      return Workout.fromDb(foundWorkout);
    }

    return null;
  }

  static async _findMany(queryObj) {
    const query = {
      include: {
        exercises: true,
      },
    };

    if (queryObj !== undefined) {
      query.where = { ...queryObj };
    }

    const foundWorkouts = await dbClient.workout.findMany(query);

    return foundWorkouts.map((workout) => Workout.fromDb(workout));
  }
}

module.exports = Workout;
