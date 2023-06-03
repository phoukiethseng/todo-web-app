import signUpHandler from "@/pages/api/user/todos";

describe("/api/user/todos test suite", () => {
  const res = {
    status: jest.fn(),
    end: jest.fn(),
  };
  afterEach(() => {
    res.status.mockReset();
    res.end.mockReset();
  });
  test.concurrent.each(["PUT", "POST", "DELETE"])(
    "it should return 405 if method is not `GET`, method: %s",
    async (method) => {
      const req = { method: method };
      await signUpHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.end).toHaveBeenCalled();
    }
  );
});
