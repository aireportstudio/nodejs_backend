import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let idleTimer: NodeJS.Timeout | null = null;

// Reset idle timer
function resetIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(async () => {
    console.log("Idle 60s – disconnecting DB");
    await prisma.$disconnect();
  }, 30 * 1000); // 30 seconds
}

// Wrapper for queries
export async function queryWrapper<T>(queryFunc: () => Promise<T>): Promise<T> {
  resetIdleTimer(); // before query
  const result = await queryFunc(); // run query
  resetIdleTimer(); // after query
  return result;
}

// Optional: ping DB to reconnect if disconnected
export async function ensureConnected() {
  try {
    await prisma.$queryRaw`SELECT 1`; // simple ping
  } catch {
    console.log("Reconnecting to DB...");
    // Prisma auto reconnects on next query
  }
}

export default prisma;
