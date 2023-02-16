import "@/styles/globals.css";
import "@/styles/datepicker.css";
import type { AppProps } from "next/app";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Inter } from "@next/font/google";
import clsx from "clsx";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";
import getSupabase from "@/utils/Supabase";

const inter = Inter({ subsets: ["latin-ext"] });

export default function App({
  Component,
  pageProps,
  router,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(getSupabase());
  const { pathname } = useRouter();
  const [showSidebar, setShowSidebar] = useState(!pathname.startsWith("/auth"));

  useEffect(() => {
    setShowSidebar(!pathname.startsWith("/auth"));
  }, [pathname]);

  const queryClient = new QueryClient();

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <main className={clsx(inter.className, "h-full flex bg-gray-100")}>
          {showSidebar && <Sidebar />}
          <div
            className={clsx(
              showSidebar && "ml-20 border-l-2 border-l-gray-100",
              "flex-1"
            )}
          >
            <AnimatePresence initial={false} mode="wait">
              <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
          </div>
        </main>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}
