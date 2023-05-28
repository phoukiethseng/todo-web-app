const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const client = new PrismaClient();
const saltRound = 12;

const populateDatabase = async () => {
  const user1 = await client.user.create({
    data: {
      name: "Phou Kiethseng",
      username: "kiethseng",
      password: bcrypt.hashSync("012858378", saltRound),
      email: "puseng123@gmail.com",
      todos: {
        create: [
          {
            title: "Kiethseng's first todo",
            completed: false,
            priority: 2,
          },
          {
            title: "Kiethseng's second todo",
            completed: false,
            priority: 1,
            deadline: new Date("2023-05-29T13:24:00.000Z"),
          },
        ],
      },
    },
  });
  const user2 = await client.user.create({
    data: {
      name: "Phal Emy",
      username: "emy",
      password: bcrypt.hashSync("12345678", saltRound),
      email: "emyphal@gmail.com",
      todos: {
        create: [
          {
            title: "Emy's first todo",
            completed: true,
            priority: 2,
            deadline: new Date("2023-06-29T13:24:00.000Z"),
          },
          {
            title: "Emy's second todo",
            completed: false,
            priority: 0,
          },
        ],
      },
    },
  });
  console.log("success");
  console.log(user1, user2);
};

populateDatabase();

client.$disconnect();
