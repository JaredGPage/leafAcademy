import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { signOut, getUserSession } from "../../utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const sessionUser = await getUserSession(request);
  if (!sessionUser) {
    return redirect("/login");
  }

  return sessionUser;
};

export const action = ({ request }: ActionFunctionArgs) => {
  return signOut(request);
};

export default function Account() {
  const sessionUser = useLoaderData<typeof loader>();
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
      {userDropDown && (
        <div className="fixed top-0 right-0 border-2 mt-24 mr-4 border-gray-300 w-1/3 h-1/3 bg-white shadow-lg p-4">
          <div className="justify-end flex ">
            <a
              href="/login"
              className="rounded-full justify-center items-center border-2 flex border-leafblue-200 w-14 h-8"
            >
              Login
            </a>
            <Form method="post">
              <button
                className="rounded-full justify-center items-center border-2 flex border-leafblue-200 w-14 h-8"
                type="submit"
              >
                Sign Out
              </button>
            </Form>
          </div>

          <p>Additional content here</p>
        </div>
      )}
      <p>hello {sessionUser.email}</p>
    </>
  );
}
