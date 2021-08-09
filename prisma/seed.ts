import { books } from "./books";
import { PrismaClient } from ".prisma/client";
const dbClient = new PrismaClient();

async function main() {
  for (const book of books) {
    await dbClient.book.create({
      data: book,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await dbClient.$disconnect();
  });
