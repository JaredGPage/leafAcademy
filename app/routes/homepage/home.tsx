/* eslint-disable react/no-unescaped-entities */
import { LoaderFunctionArgs } from "@remix-run/node";
import { useState } from "react";
import { getUserSession } from "../../utils/session.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let sessionUser = await getUserSession(request);
  if (!sessionUser) {
    sessionUser = null;
    return sessionUser;
  }

  return sessionUser;
};

export default function Home() {
  const [userDropDown, setUserDropDown] = useState(false);
  const sessionUser = useLoaderData<typeof loader>();

  const handleUserClick = () => {
    setUserDropDown(!userDropDown);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      handleUserClick();
    }
  };
  return (
    <>
      <div className="w-full h-14  border-b-2 border-gray-300 justify-end flex space-x-4">
        {!sessionUser && (
          <>
            <a
              href="/create-account"
              className="w-44 h-10 mb-2 rounded-full text-gray-600 font-semibold border-leafblue-400 border-[3px] items-center justify-center flex hover:cursor-pointer"
            >
              Create Account
            </a>
            <a
              href="/login"
              className="w-28 h-10 mb-2 rounded-full text-gray-600 font-semibold border-leafblue-400 border-[3px] items-center justify-center flex hover:cursor-pointer"
            >
              Login
            </a>
          </>
        )}

        <div
          role="button"
          tabIndex={0}
          className="w-10 h-10 mb-2 rounded-full border-leafblue-400 border-[3px] items-center justify-center flex hover:cursor-pointer"
          onClick={handleUserClick}
          onKeyPress={handleKeyPress}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
      </div>
      <div className="p-5 overflow-y-scroll scrollbar-none flex h-full w-full">
        <div className="flex  px-5 rounded-3xl w-[100%] md:w-[99%] h-[300px] md:h-1/4 lg:h-[40%]  bg-leafblue-200 bg-opacity-50">
          <div className="flex flex-col w-full md:w-4/5 lg:w-3/4">
            <p className="text-gray-700 pt-1 lg:pt-10 text-base lg:text-3xl ml-1 lg:ml-10 font-semibold">
              Welcome to
            </p>
            <p className="text-leafblue-300 font-bold ml-1 lg:ml-10 text-2xl lg:text-5xl">
              leaf academy
            </p>
            <p className="text-white lg:w-3/4 w-full pt-2 lg:pt-8 font-semibold text-base lg:text-xl ml-1 lg:ml-20 ">
              Welcome to my personal corner on the web! This site is a showcase
              of my abilities and passions. Here, you'll find a variety of
              content that reflects my journey and skills.
            </p>
          </div>
          <div className="lg:w-1/4 md:w-1/6 flex justify-end items-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#71bbf6"
              className="size-0 md:size-40 lg:size-56"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
