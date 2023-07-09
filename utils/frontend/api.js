const doFetch = async ({ path, method, body }) => {
  console.log(`doFetch before fetching ${path}`, {
    method,
    body: JSON.stringify(body),
  });
  const response = await fetch(path, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });
  const statusCode = response.status;
  let data = null;
  try {
    // try to parse body as JSON, if it fails we do nothing and let caller handle it
    data = await response.json();
  } catch (err) {}
  console.log(`doFetch fetching ${path}, result:`, {
    statusCode,
    response: {
      body: {
        ...data,
      },
    },
  });
  return { statusCode, data };
};

const GET = async (path, body) => {
  return await doFetch({ path, body, method: "GET" });
};
const POST = async (path, body) => {
  return await doFetch({ path, body, method: "POST" });
};
const DELETE = async (path, body) => {
  return await doFetch({ path, body, method: "DELETE" });
};
const PUT = async (path, body) => {
  return await doFetch({ path, body, method: "PUT" });
};

export { GET, POST, PUT, DELETE };
