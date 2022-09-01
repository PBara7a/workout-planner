const dbClient = require("../src/utils/prisma");

const exercises = require("../exercises.json");

async function seed() {
  await createEquipments();
  await createBodyParts();
  await createTargets();
  await createExercises();
  await createWorkouts();

  process.exit(0);
}

async function createEquipments() {
  const equipmentsData = [];
  exercises.forEach((exercise) => {
    equipmentsData.push({ name: exercise.equipment });
  });

  const createdEquipments = await dbClient.equipment.createMany({
    data: equipmentsData,
    skipDuplicates: true,
  });
  return createdEquipments;
}

async function createBodyParts() {
  const bodyPartsData = [];
  exercises.forEach((exercise) => {
    bodyPartsData.push({ name: exercise.bodyPart });
  });

  const createdbodyParts = await dbClient.bodyPart.createMany({
    data: bodyPartsData,
    skipDuplicates: true,
  });
  return createdbodyParts;
}

async function createTargets() {
  const uniqueBodyParts = await dbClient.bodyPart.findMany({});
  const bodyPartsMap = {};

  uniqueBodyParts.forEach((bodyPart) => {
    bodyPartsMap[bodyPart.name] = bodyPart.id;
  });

  const targetsData = [];
  exercises.forEach((exercise) => {
    targetsData.push({
      name: exercise.target,
      bodyPartId: bodyPartsMap[exercise.bodyPart],
    });
  });

  const createdTargets = await dbClient.target.createMany({
    data: targetsData,
    skipDuplicates: true,
  });
  return createdTargets;
}

async function createExercises() {
  const uniqueEquipments = await dbClient.equipment.findMany({});
  const equipmentsMap = {};

  uniqueEquipments.forEach((equipment) => {
    equipmentsMap[equipment.name] = equipment.id;
  });

  const uniqueTargets = await dbClient.target.findMany({});
  const targetsMap = {};

  uniqueTargets.forEach((target) => {
    targetsMap[target.name] = target.id;
  });

  const uniqueBodyParts = await dbClient.bodyPart.findMany({});
  const bodyPartsMap = {};

  uniqueBodyParts.forEach((bodyPart) => {
    bodyPartsMap[bodyPart.name] = bodyPart.id;
  });

  const exercisesData = [];
  exercises.forEach((exercise) => {
    exercisesData.push({
      name: exercise.name,
      demo: exercise.gifUrl.match(/\d{4}/)[0],
      equipmentId: equipmentsMap[exercise.equipment],
      targetId: targetsMap[exercise.target],
      bodyPartId: bodyPartsMap[exercise.bodyPart],
    });
  });

  const createdExercises = await dbClient.exercise.createMany({
    data: exercisesData,
    skipDuplicates: true,
  });
  return createdExercises;
}

async function createWorkouts() {
  await dbClient.workout.create({
    data: {
      name: "Workout 1: Upperbody",
      target: "Upperbody",
      notes: "8-12 reps",
      exercises: {
        connect: [
          { id: 99 },
          { id: 475 },
          { id: 481 },
          { id: 581 },
          { id: 1063 },
        ],
      },
    },
  });

  await dbClient.workout.create({
    data: {
      name: "Workout 2: Lowerbody",
      target: "Lowerbody",
      notes: "8-12 reps",
      exercises: {
        connect: [
          { id: 130 },
          { id: 183 },
          { id: 556 },
          { id: 669 },
          { id: 1318 },
        ],
      },
    },
  });

  await dbClient.workout.create({
    data: {
      name: "Workout 3: Upperbody",
      target: "Upperbody",
      notes: "8-12 reps",
      exercises: {
        connect: [
          { id: 102 },
          { id: 107 },
          { id: 131 },
          { id: 191 },
          { id: 648 },
        ],
      },
    },
  });

  await dbClient.workout.create({
    data: {
      name: "Workout 4: Lowerbody",
      target: "Lowerbody",
      notes: "8-12 reps",
      exercises: {
        connect: [{ id: 130 }, { id: 451 }, { id: 699 }, { id: 1261 }],
      },
    },
  });
}

seed()
  .catch(async (e) => {
    console.error(e);
    await dbClient.$disconnect();
  })
  .finally(() => process.exit(1));
