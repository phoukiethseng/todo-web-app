const { PrismaClient, Priority } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const saltRound = 12;

const users = [
  {
    name: "Phou Kiethseng",
    username: "kiethseng",
    password: bcrypt.hashSync("012858378", saltRound),
    email: "puseng123@gmail.com",
    todos: [
      {
        title: "Kiethseng's first todo",
        completed: false,
        priority: Priority.IMPORTANT,
      },
      {
        title: "Kiethseng's second todo",
        completed: false,
        priority: Priority.URGENT,
        deadline: new Date("2023-05-29T13:24:00.000Z"),
      },
    ],
  },
  {
    name: "Phal Emy",
    username: "emy",
    password: bcrypt.hashSync("12345678", saltRound),
    email: "emyphal@gmail.com",
    todos: [
      {
        title: "Emy's first todo",
        completed: true,
        priority: Priority.NOT_IMPORTANT,
        deadline: new Date("2023-06-29T13:24:00.000Z"),
      },
      {
        title: "Emy's second todo",
        completed: false,
        priority: Priority.URGENT,
      },
    ],
  },
];

const populateDatabase = async () => {
  try {
    users.forEach((user) => {
      // query if user already existed
      prisma.user
        .findFirst({
          where: {
            username: user.username,
          },
        })
        .then((result) => {
          if (!result) {
            const { todos, ...userInfo } = user;
            prisma.user
              .create({
                data: {
                  ...userInfo,
                  todos: {
                    create: [...todos],
                  },
                },
              })
              .then((u) => {
                console.log("Created user", u);
              })
              .catch((error) => {
                console.log("Error creating user", error);
              });
          }
        });
    });
  } catch (error) {
    console.log("Failed to seed database", error);
  }
};

populateDatabase();

prisma.$disconnect();
