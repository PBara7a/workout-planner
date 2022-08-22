const dbClient = require("../src/utils/prisma");

const exercises = require("../exercises.json");

async function seed() {
  await createEquipments();
  await createBodyParts();
  await createTargets();
  await createExercises();

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

  const exercisesData = [];
  exercises.forEach((exercise) => {
    exercisesData.push({
      name: exercise.name,
      demo: exercise.gifUrl.match(/\d{4}/)[0],
      equipmentId: equipmentsMap[exercise.equipment],
      targetId: targetsMap[exercise.target],
    });
  });

  const createdExercises = await dbClient.exercise.createMany({
    data: exercisesData,
    skipDuplicates: true,
  });
  return createdExercises;
}

seed()
  .catch(async (e) => {
    console.error(e);
    await dbClient.$disconnect();
  })
  .finally(() => process.exit(1));
