import { useState } from "react";
import { useActionData, Form, json, redirect } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createAccount } from "../models/account.server";
import { signIn } from "../utils/db.server";
import { createUserSession } from "../utils/session.server";

// Loader to ensure user is not logged in
export const loader: LoaderFunction = async ({ request }) => {
  // Add logic to check if the user is already logged in
  // If logged in, redirect to another page (e.g., dashboard)
  return null;
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  const { user } = await signIn(email, password);
  const token = await user.getIdToken();
  return createUserSession(token, "/homepage/home");
};

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center h-screen">
      <Form
        method="post"
        className="w-full max-w-md bg-white p-8 rounded shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
      </Form>
    </div>
  );
}
