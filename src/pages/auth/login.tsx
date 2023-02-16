import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect } from "react";
import Logo from "@/images/logo.png";

const Redirect: FunctionComponent<{ url: string }> = ({ url }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(url);
  }, [router, url]);
  return null;
};

export const getServerSideProps: GetServerSideProps<{
  memeUrl: string;
}> = async () => {
  const data = await fetch("https://meme-api.com/gimme");
  const json = await data.json();
  return {
    props: {
      memeUrl: json.url,
    },
  };
};

export default function Login({
  memeUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const { success, error } = router.query;

  const signIn = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }, [supabase.auth]);

  return session ? (
    <Redirect url="/" />
  ) : success && !error ? null : (
    <>
      <Head>
        <title>Logowanie</title>
        <meta name="description" content="Logowanie" key="logowanie" />
      </Head>
      <div className="grid grid-cols-2 bg-gray-100 h-full max-h-full ">
        <div className="col-span-1 flex p-32 h-screen">
          <Image
            src={memeUrl}
            alt="Meme"
            width={2048}
            height={2048}
            className="min-h-full min-w-full w-auto h-auto object-contain"
          />
        </div>
        <div className="col-span-1 flex flex-col w-full items-center justify-center shadow-[-4px_4px_24px] shadow-black/50">
          <Image src={Logo} alt="Purple Deer Logo" className="w-10 h-10" />
          <h1 className="mt-12 mb-16 text-white/95 text-3xl font-semibold">
            Cześć Jelonku!
          </h1>
          <button
            className="flex justify-center gap-2 items-center rounded-lg shadow-[0_4px_24px] shadow-black/25 w-80 h-16 bg-purple-dark font-medium text-base text-white/95 transition-transform hover:scale-105"
            onClick={signIn}
          >
            <svg
              className="h-5 w-5 text-white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M17.788 5.108A9 9 0 1021 12h-8" />
            </svg>
            Zaloguj przez Gmail
          </button>
        </div>
      </div>
    </>
  );
}
