import todoHandler from "@/pages/api/todo";
import todosHandler from "@/pages/api/user/todos";

jest.mock("next-auth", () => ({
  getServerSession: () => Promise.resolve(undefined),
}));

describe("API should response 403 if there is no session", () => {
  const res = {
    status: jest.fn(),
    end: jest.fn(),
  };
  const req = {
    method: "GET",
  };
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("/api/todo test", async () => {
    await todoHandler(null, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.end).toHaveBeenCalled();
  });
  test("/api/user/todos test", async () => {
    await todosHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.end).toHaveBeenCalled();
  });
});
