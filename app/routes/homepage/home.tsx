import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

export const loader: LoaderFunction = async ({ request }) => {
  return "hello";
};

export default function Home() {
  const data = useLoaderData<typeof loader>();
  const [userDropDown, setUserDropDown] = useState(false);

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
      <div>
        <p>Hello</p>
      </div>
    </>
  );
}
