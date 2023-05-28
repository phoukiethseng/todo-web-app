import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import NavBar from "@/components/v2/layout/NavBar";

export default function App({ Component, pageProps }) {
  const { session, useLayout, navMenuEnable } = pageProps;
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      {useLayout && (
        <>
          <NavBar
            signedIn={session ? true : false}
            userName={session?.user.name}
            imgUrl={session?.user.image}
            navMenuEnable={navMenuEnable}
          />
          <Component {...pageProps} />
        </>
      )}
      {!useLayout && <Component {...pageProps} />}
    </SessionProvider>
  );
}
