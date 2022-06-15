const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const exercises = require("../exercises.json");

async function seed() {
  const equipments = await createEquipments();
  const bodyParts = await createTargets();

  process.exit(0);
}

async function createEquipments() {
  const equipments = [];
  exercises.forEach((exercise) => {
    equipments.push({ name: exercise.equipment });
  });

  const createdEquipments = await prisma.equipment.createMany({
    data: equipments,
    skipDuplicates: true,
  });
  return createdEquipments;
}

async function createTargets() {
  const targets = [];
  exercises.forEach((exercise) => {
    targets.push({ name: exercise.target });
  });

  const createdTargets = await prisma.target.createMany({
    data: targets,
    skipDuplicates: true,
  });
  return createdTargets;
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
