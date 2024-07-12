import { useState } from "react";
import { Form, useActionData } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { signUp } from "../utils/db.server";
import { createUserSession } from "../utils/session.server";
import { badRequest } from "../utils/request.server";

// Loader to ensure user is not logged in
export const loader: LoaderFunction = async () => {
  // Add logic to check if the user is already logged in
  // If logged in, redirect to another page (e.g., dashboard)
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const email = (formData.get("email") as string) || "no email";
  const password = formData.get("password") as string;

  try {
    const { user } = await signUp(email, password);
    const token = await user.getIdToken();
    return createUserSession(token, "/homepage/home");
  } catch (error) {
    console.error(error);
    return badRequest({
      fieldErrors: { email: "Oops", password: null },
      formError: "We couldn't log you in, please try again",
    });
  }
};

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const lastRestult = useActionData<typeof action>();

  return (
    <div className="flex justify-center items-center h-screen">
      <Form
        method="post"
        className="w-full max-w-md bg-white p-8 rounded shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        {lastRestult?.fieldErrors && (
          <div>
            <p className="text-red-500">{lastRestult.formError}</p>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4 w-full items-center justify-center mx-auto">
          <a
            href="/login"
            className="text-center w-full items-center justify-center mx-auto text-leafblue-400"
          >
            <p>Already have an account?</p>
          </a>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Create Account
        </button>
      </Form>
    </div>
  );
}
