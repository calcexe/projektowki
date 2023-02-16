import clsx from "clsx";
import { motion } from "framer-motion";
import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ArrowRightOnRectangleIcon,
  ClockIcon,
  RectangleStackIcon,
  SunIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Logo from "@/images/logo.png";
import Image from "next/image";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "w-10 h-10 bg-transparent z-10 transition-transform",
        "hover:scale-110",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

type LinkProps = NextLinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const Link: FunctionComponent<LinkProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <NextLink
      className={clsx(
        "w-10 h-10 bg-transparent z-10 transition-transform flex",
        "hover:scale-110",
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
};

const Icon: FunctionComponent<{
  children: React.ReactNode;
  active: boolean;
}> = ({ children, active }) => {
  return (
    <div
      className={clsx(
        "h-4 w-4 m-auto transition-colors",
        active ? "text-white" : "text-white/60"
      )}
    >
      {children}
    </div>
  );
};

const getPageIndex = (pathname: string) => {
  if (pathname === "/") {
    return 0;
  } else {
    const paths = ["/projects", "/users", "/holidays"];
    const index = paths.findIndex((path) => pathname.startsWith(path));
    return index + 1;
  }
};

const Sidebar = () => {
  const router = useRouter();
  const [index, setIndex] = useState(getPageIndex(router.pathname));
  const supabase = useSupabaseClient();

  useEffect(() => {
    setIndex(getPageIndex(router.pathname));
  }, [router.pathname]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  }, [router, supabase.auth]);

  return (
    <nav className="h-full w-20 box-content z-50 border-r-2 border-r-gray-100 flex flex-col items-center bg-gray-200 fixed bottom-0 top-0 left-0">
      <div className="w-full h-14 bg-purple-dark flex items-center justify-center border-b-2 border-b-gray-100">
        <Image src={Logo} alt="Purple Deer Logo" className=" w-7 h-7" />
      </div>
      <div className="flex flex-col flex-auto h-0 overflow-auto items-center w-full">
        <div className="flex flex-col w-fit justify-center gap-2 mt-8 relative bg-gray-lighter p-0.5 rounded-[15px]">
          <div
            className={clsx(
              "absolute top-0.5 left-0 right-0 bottom-0.5 grid gap-2 grid-rows-4 z-0"
            )}
          >
            <motion.div
              className={clsx(
                "w-10 h-10 bg-purple-regular rounded-2xl mx-auto",
                index < 0 ? "opacity-0" : "opacity-100"
              )}
              style={{ gridRowStart: index + 1 }}
              layout
            />
          </div>
          <Link href="/">
            <Icon active={index === 0}>
              <ClockIcon />
            </Icon>
          </Link>
          <Link href="/projects">
            <Icon active={index === 1}>
              <RectangleStackIcon />
            </Icon>
          </Link>
          <Link href="/users">
            <Icon active={index === 2}>
              <UsersIcon />
            </Icon>
          </Link>
          <Link href="/holidays">
            <Icon active={index === 3}>
              <SunIcon />
            </Icon>
          </Link>
        </div>
        <div className="my-5 flex-1 flex items-end h-full">
          <Button
            onClick={signOut}
            className={clsx(
              "bg-gray-lighter rounded-2xl transition-colors",
              "hover:bg-purple-regular"
            )}
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4 text-white m-auto" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
