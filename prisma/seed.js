const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

const populateDatabase = async () => {
  const user1 = await client.user.create({
    data: {
      name: "Phou Kiethseng",
      username: "kiethseng",
      password: "012858378",
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
      password: "12345678",
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
