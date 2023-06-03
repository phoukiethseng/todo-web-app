import todoHandler from "@/pages/api/todo";

jest.mock("@/utils/backend/todo/methodHandler");
jest.mock("next-auth");

describe("/api/todo test suite", () => {
  const res = {
    status: jest.fn(),
    end: jest.fn(),
  };
  afterEach(() => {
    res.status.mockReset();
    res.end.mockReset();
  });
  test("should return 403 when there is no session", async () => {
    const req = {};
    const { getServerSession } = jest.requireMock("next-auth");
    getServerSession.mockReset();
    getServerSession.mockImplementation(() => {
      return null;
    });
    await todoHandler(req, res);
    expect(getServerSession).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.end).toHaveBeenCalled();
  });
  test.each(["GET", "POST", "PUT", "DELETE"])(
    "it should invoke correct http method handler functions, method: %s",
    async (method) => {
      const req = { method: method };
      const methodHandler = require("@/utils/backend/todo/methodHandler");
      const { getServerSession } = jest.requireMock("next-auth");
      getServerSession.mockReset();
      getServerSession.mockImplementation(() => {
        return {
          user: {
            id: "foo",
          },
        };
      });
      await todoHandler(req, res);
      expect(methodHandler[`handle${method}`]).toHaveBeenCalled();
      expect(res.end).toHaveBeenCalled();
    }
  );
});
