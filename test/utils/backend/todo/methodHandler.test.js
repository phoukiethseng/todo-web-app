import {
  handlePUT,
  handlePOST,
  handleDELETE,
  handleGET,
} from "@/utils/backend/todo/methodHandler";

jest.mock("@/utils/backend/updateTodo");
jest.mock("@/utils/backend/deleteTodo");
jest.mock("@/utils/backend/addTodo");
jest.mock("@/utils/backend/fetchUserSingleTodo");

describe("Make sure handler function call the right utils function", () => {
  const res = {
    status: jest.fn(() => res),
    end: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const req = {
    body: {
      id: "foo",
      title: "bar",
      deadline: "2026-05-24T00:00:00Z",
      completed: false,
      priority: 2,
    },
  };
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("PUT handler", async () => {
    const localReq = req;
    const { updateTodo } = jest.requireMock("@/utils/backend/updateTodo");
    updateTodo.mockImplementation(async () => {
      return {};
    });
    await handlePUT(localReq, res);
    expect(updateTodo).toHaveBeenCalledWith(localReq.body);
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it("DELETE handler", async () => {
    const localReq = req;
    const { deleteTodo } = jest.requireMock("@/utils/backend/deleteTodo");
    deleteTodo.mockImplementation(async () => {
      return {};
    });
    await handleDELETE(localReq, res);
    expect(deleteTodo).toHaveBeenCalledWith(req.body.id);
  });
  it("POST handler", async () => {
    const {
      body: { id, title, priority, deadline },
    } = req;
    const localReq = {
      body: {
        title,
        priority,
        deadline,
      },
    };
    const { addTodo } = jest.requireMock("@/utils/backend/addTodo");
    addTodo.mockImplementation(async () => {
      return {};
    });
    await handlePOST(localReq, res, id);
    expect(addTodo).toHaveBeenCalledWith({
      userId: id,
      todo: {
        ...localReq.body,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it("GET handler", async () => {
    const localReq = req;
    const { fetchUserSingleTodo } = jest.requireMock(
      "@/utils/backend/fetchUserSingleTodo"
    );
    fetchUserSingleTodo.mockImplementation(async () => {
      return {};
    });
    await handleGET(localReq, res);
    expect(fetchUserSingleTodo).toHaveBeenCalledWith(localReq.body.id);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
