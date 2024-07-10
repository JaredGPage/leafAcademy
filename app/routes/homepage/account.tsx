import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  const user = "hello user";
  return user;
};

export default function Account() {
  const user = useLoaderData<typeof loader>();
  return (
    <>
      <div>
        <p>hello {user}</p>
      </div>
    </>
  );
}
