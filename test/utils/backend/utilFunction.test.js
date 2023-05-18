import { addNewUser } from "../../../utils/backend/addNewUser";
import { addTodo } from "../../../utils/backend/addTodo";
import { deleteTodo } from "../../../utils/backend/deleteTodo";
import { fetchUserSingleTodo } from "../../../utils/backend/fetchUserSingleTodo";
import { fetchUserTodos } from "../../../utils/backend/fetchUserTodos";
import { getUserByUsername } from "../../../utils/backend/getUserByUsername";
import { updateTodo } from "../../../utils/backend/updateTodo";

describe("Utils function return null when error thrown", () => {
  test("addNewUser test", async () => {
    const user = {
      username: "foo",
      password: "banana",
      name: "john",
      email: "foo@example.com",
    };
    const prismaMock = {
      user: {
        create: jest.fn(() => {
          throw new Error();
        }),
      },
    };
    const result = await addNewUser({ ...user, prisma: prismaMock });
    expect(result).toBeNull();
  });
  test("addTodo test", async () => {
    const prismaMock = {
      todo: {
        create: jest.fn(() => {
          throw new Error();
        }),
      },
    };
    const param = {
      userId: "foo",
      todo: {
        name: "banana",
        content: "apple",
      },
    };
    const result = await addTodo({ ...param, prisma: prismaMock });
    expect(result).toBeNull();
  });
  test("deleteTodo test", async () => {
    const todoId = "foo";
    const prismaMock = {
      todo: {
        delete: jest.fn(() => {
          throw new Error();
        }),
      },
    };
    const result = await deleteTodo(todoId, prismaMock);
    expect(result).toBeNull();
  });
  test("fetchUserTodos test", async () => {
    const prismaMock = {
      todo: {
        findMany: jest.fn(() => {
          throw new Error();
        }),
      },
    };
    const userId = "foo";
    const result = await fetchUserTodos(userId, prismaMock);
    expect(result).toBeNull();
  });
  test("fetchUserSingleTodo test", async () => {
    const prismaMock = {
      todo: {
        findFirst: jest.fn(() => {
          throw new Error();
        }),
      },
    };
    const todoId = "foo";
    const result = await fetchUserSingleTodo(todoId, prismaMock);
    expect(result).toBeNull();
  });
  test("getUserByUsername test", async () => {
    const username = "foo";
    const prismaMock = {
      user: {
        findFirst: jest.fn(() => {
          throw new Error();
        }),
      },
    };
    const result = await getUserByUsername(username, prismaMock);
    expect(result).toBeNull();
  });
  test("updateTodo test", async () => {
    const prismaMock = {
      todo: {
        update: jest.fn(() => {
          throw new Error();
        }),
      },
    };
    const todo = {
      id: "foo",
      name: "banana",
      content: "blah",
      checked: false,
    };
    const result = await updateTodo({ ...todo, prisma: prismaMock });
    expect(result).toBeNull();
  });
});

describe("Passing null arguement will return null", () => {
  test("addNewUser test", async () => {
    const prismaMock = {
      user: {
        create: jest.fn(),
      },
    };
    const result = await addNewUser({
      username: null,
      password: null,
      name: null,
      email: null,
      prisma: prismaMock,
    });
    expect(result).toBeNull();
    expect(prismaMock.user.create).not.toHaveBeenCalled();
  });
  test("addTodo test", async () => {
    const prismaMock = {
      todo: {
        create: jest.fn(),
      },
    };
    const userId = null;
    const todo = {
      name: null,
      content: null,
    };
    const result = await addTodo({ userId, todo, prisma: prismaMock });
    expect(result).toBeNull();
    expect(prismaMock.todo.create).not.toHaveBeenCalled();
  });
  test("deleteTodo test", async () => {
    const prismaMock = {
      todo: {
        delete: jest.fn(),
      },
    };
    const todoId = null;
    const result = await deleteTodo(todoId, prismaMock);
    expect(result).toBeNull();
    expect(prismaMock.todo.delete).not.toHaveBeenCalled();
  });
  test("fetchUserSingleTodo test", async () => {
    const prismaMock = {
      user: {
        findFirst: jest.fn(),
      },
    };
    const todoId = null;
    const result = await fetchUserSingleTodo(todoId, prismaMock);
    expect(result).toBeNull();
    expect(prismaMock.user.findFirst).not.toHaveBeenCalled();
  });
  test("fetchUserTodos test", async () => {
    const prismaMock = {
      todo: {
        findMany: jest.fn(),
      },
    };
    const userId = null;
    const result = await fetchUserTodos(userId, prismaMock);
    expect(result).toBeNull();
    expect(prismaMock.todo.findMany).not.toHaveBeenCalled();
  });
  test("getUserByUsername test", async () => {
    const username = null;
    const prismaMock = {
      user: {
        findFirst: jest.fn(),
      },
    };
    const result = await getUserByUsername(username, prismaMock);
    expect(result).toBeNull();
    expect(prismaMock.user.findFirst).not.toHaveBeenCalled();
  });
  test("updateTodo test", async () => {
    const todo = {
      id: null,
      name: null,
      content: null,
      checked: null,
    };
    const prismaMock = {
      todo: {
        update: jest.fn(),
      },
    };
    const result = await updateTodo({ ...todo, prisma: prismaMock });
    expect(result).toBeNull();
    expect(prismaMock.todo.update).not.toHaveBeenCalled();
  });
});
