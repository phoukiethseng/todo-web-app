import { getCsrfToken } from "next-auth/react";

async function verifyCsrfToken({ csrfToken, req }) {
  const serverCsrfToken = await getCsrfToken({ req: { headers: req.headers } });
  return csrfToken && csrfToken === serverCsrfToken;
}

export { verifyCsrfToken };
