import "@/styles/globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const { session, useLayout } = pageProps;
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      {!useLayout && <Component {...pageProps} />}

      {useLayout && (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}
    </SessionProvider>
  );
}
