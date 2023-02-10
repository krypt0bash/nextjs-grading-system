import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "../styles/globals.css";
import {
  Session,
  createBrowserSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Database } from "@utils/database.types";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  const router = useRouter();
  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_OUT") router.push("/");
    });
  });

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
      <Toaster />
    </SessionContextProvider>
  );
}
