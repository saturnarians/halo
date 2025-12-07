import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: passwordHash,
      role: "admin",
      name: "Admin User",
    },
  });

  console.log("Seed finished.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
