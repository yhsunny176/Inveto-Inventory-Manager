import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";

const prisma = new PrismaClient();


async function main() {
  const demoUserId = "fc4f918d-6720-47b3-98a4-26c7f54d8f67"

  await prisma.product.createMany({
    data: Array.from({length:25}).map((_, i)=> ({
      userId: demoUserId,
      name: `Product ${i+1}`,
      price: (Math.random() * 90 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
    }))
  });
}

main()
    .catch((e)=> {
      console.error(e);
      process.exit(1);
    })
    .finally(async()=>{
      await prisma.$disconnect();
    })