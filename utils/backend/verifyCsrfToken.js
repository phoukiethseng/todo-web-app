import { getCsrfToken } from "next-auth/react";

async function verifyCsrfToken({ csrfToken, req }) {
  const serverCsrfToken = await getCsrfToken({ req });
  return csrfToken && csrfToken === serverCsrfToken;
}

export { verifyCsrfToken };
