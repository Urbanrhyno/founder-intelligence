/**
 * Standalone script to run ingestion once (e.g. from CLI or external scheduler).
 */
import 'dotenv/config';
import { runIngestion } from '../services/articleService.js';
import { prisma } from '../lib/prisma.js';

async function main() {
  console.log('Running one-off ingestion...');
  const result = await runIngestion();
  console.log('Result:', result);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
