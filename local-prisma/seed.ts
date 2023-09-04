import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// async function seed() {
//   await Promise.all(
//     getExpenses().map((expense) => {
//       return db.expense.create({ data: expense });
//     })
//   );
// }
async function seed() {
  const kody = await db.user.create({
    data: {
      email: "david@gamil.com",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });
  await Promise.all(
    getExpenses().map((expense) => {
      const data = { userId: kody.id, ...expense };
      return db.expense.create({ data });
    })
  );
}

seed();

function getExpenses() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      title: "Road worker",
      amount: 16.25,
    },
    {
      title: "Frisbee",
      amount: 50.01,
    },
    {
      title: "Trees",
      amount: 14,
    },
    {
      title: "Skeletons",
      amount: 70.95,
    },
    {
      title: "Hippos",
      amount: 67,
    },
    {
      title: "Dinner",
      amount: 82.34,
    },
    {
      title: "Elevator",
      amount: 23.76,
    },
  ];
}
