import prisma from "./src/config/db";   // adjust path if needed
import bcrypt from "bcryptjs";

async function main() {
  const email = "admin@aireportstudio.com";
  const password = "admin@aireportstudio"; // plain text, will be hashed

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user if not exists
  const user = await prisma.user.upsert({
    where: { email },
    update: {}, // do nothing if already exists
    create: {
      email,
      password: hashedPassword,
    },
  });

  console.log("✅ User seeded:", user.email);
}

main()
  .then(() => {
    console.log("🎉 Seeding finished.");
    process.exit(0);
  })
  .catch((e) => {
    console.error("❌ Error seeding user:", e);
    process.exit(1);
  });
