import signUpHandler from "@/pages/api/user/signup";

jest.mock("@/utils/backend/verifyCsrfToken");
jest.mock("@/utils/backend/validateCredentials");
jest.mock("@/utils/backend/getUserByUsername");
jest.mock("@/utils/backend/addNewUser");

describe("/api/user/signup request failed test", () => {
  const res = {
    status: jest.fn(),
    end: jest.fn(),
    send: jest.fn(),
  };
  const req = {
    body: {
      username: "foo",
      password: "banana",
      email: "test@example.com",
      name: "apple",
      csrfToken: null,
    },
  };
  afterEach(() => {
    res.status.mockReset();
    res.end.mockReset();
    res.send.mockReset();
  });
  test("it should return 403 if there is no csrf token", async () => {
    await signUpHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.end).toHaveBeenCalled();
  });
  test("it should return 403 if csrf token does not match", async () => {
    const { verifyCsrfToken } = jest.requireMock(
      "@/utils/backend/verifyCsrfToken"
    );
    verifyCsrfToken.mockReset();
    verifyCsrfToken.mockImplementation(() => false);
    await signUpHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.end).toHaveBeenCalled();
  });
  test("it should return 400 if credentials validation failed", async () => {
    const { verifyCsrfToken } = jest.requireMock(
      "@/utils/backend/verifyCsrfToken"
    );
    verifyCsrfToken.mockReset();
    verifyCsrfToken.mockImplementation(() => true);
    const { validateCredentials } = jest.requireMock(
      "@/utils/backend/validateCredentials"
    );
    validateCredentials.mockReset();
    validateCredentials.mockImplementation(() => {
      return {
        valid: false,
        message: "Validation failed",
      };
    });
    const req = {
      body: {
        csrfToken: "pineapple",
      },
    };

    await signUpHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(validateCredentials).toHaveBeenCalled();
  });
  test("it should return 400 if username already existed", async () => {
    const { verifyCsrfToken } = jest.requireMock(
      "@/utils/backend/verifyCsrfToken"
    );
    verifyCsrfToken.mockReset();
    verifyCsrfToken.mockImplementation(() => true);
    const { validateCredentials } = jest.requireMock(
      "@/utils/backend/validateCredentials"
    );
    validateCredentials.mockReset();
    validateCredentials.mockImplementation(() => {
      return {
        valid: true,
      };
    });
    const { getUserByUsername } = jest.requireMock(
      "@/utils/backend/getUserByUsername"
    );
    getUserByUsername.mockReset();
    getUserByUsername.mockImplementation(() => true);
    const req = {
      body: {
        username: "foo",
        csrfToken: "pineapple",
      },
    };
    await signUpHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(getUserByUsername).toHaveBeenCalledWith("foo");
  });
  test("it should return 500 if add new user failed", async () => {
    const { verifyCsrfToken } = jest.requireMock(
      "@/utils/backend/verifyCsrfToken"
    );
    verifyCsrfToken.mockReset();
    verifyCsrfToken.mockImplementation(() => true);
    const { validateCredentials } = jest.requireMock(
      "@/utils/backend/validateCredentials"
    );
    validateCredentials.mockReset();
    validateCredentials.mockImplementation(() => {
      return {
        valid: true,
      };
    });
    const { getUserByUsername } = jest.requireMock(
      "@/utils/backend/getUserByUsername"
    );
    getUserByUsername.mockReset();
    getUserByUsername.mockImplementation(() => false);
    const { addNewUser } = jest.requireMock("@/utils/backend/addNewUser");
    addNewUser.mockReset();
    addNewUser.mockImplementation(() => false);
    const localReq = {
      body: {
        ...req.body,
        csrfToken: "foo",
      },
    };
    await signUpHandler(localReq, res);
    expect(addNewUser).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.end).toHaveBeenCalled();
  });
});

describe("/api/user/signup request success test", () => {
  const res = {
    status: jest.fn(),
    end: jest.fn(),
    send: jest.fn(),
  };
  const req = {
    body: {
      username: "foo",
      password: "banana",
      email: "test@example.com",
      name: "apple",
      csrfToken: "pineapple",
    },
  };
  afterEach(() => {
    res.status.mockReset();
    res.end.mockReset();
    res.send.mockReset();
  });
  test("it should return 200 if request is successful", async () => {
    const { verifyCsrfToken } = jest.requireMock(
      "@/utils/backend/verifyCsrfToken"
    );
    verifyCsrfToken.mockReset();
    verifyCsrfToken.mockImplementation(() => true);
    const { validateCredentials } = jest.requireMock(
      "@/utils/backend/validateCredentials"
    );
    validateCredentials.mockReset();
    validateCredentials.mockImplementation(() => {
      return {
        valid: true,
      };
    });
    const { getUserByUsername } = jest.requireMock(
      "@/utils/backend/getUserByUsername"
    );
    getUserByUsername.mockReset();
    getUserByUsername.mockImplementation(() => false);

    const { addNewUser } = jest.requireMock("@/utils/backend/addNewUser");
    addNewUser.mockReset();
    addNewUser.mockImplementation(() => true);

    await signUpHandler(req, res);

    expect(addNewUser).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
