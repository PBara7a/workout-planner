const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  process.exit(0);
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
