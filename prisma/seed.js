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
            name: "Kiethseng's first todo",
            content: "This is my first todo",
          },
          {
            name: "Kiethseng's second todo",
            content: "This is my second todo",
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
            name: "Emy's first todo",
            content: "Hi",
          },
          {
            name: "Emy's second todo",
            content: "Hello",
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
