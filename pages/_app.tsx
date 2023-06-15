import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CountContextProvider } from "@/context/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <CountContextProvider>
        <Component {...pageProps} />
      </CountContextProvider>
    </SessionProvider>
  );
}
