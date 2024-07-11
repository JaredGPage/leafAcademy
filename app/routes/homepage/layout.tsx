import { NavLink, Outlet } from "@remix-run/react";
import logo from "../../../images/leafLogo.png";

const menus = [
  {
    title: "Home",
    url: "/homepage/home",
  },
  {
    title: "Account",
    url: "/homepage/account",
  },
];

export default function HomeLayout() {
  return (
    <div className="flex h-screen flex-col">
      <div className="relative flex h-screen w-full overflow-hidden">
        <aside className="h-full w-72 border-r p-12 text-lg">
          <picture className="mb-4 flex items-center mx-auto justify-center">
            <img className="w-full h-auto" src={logo} alt="logo" />
          </picture>
          <ul className="space-y-3">
            {menus.map((menu) => (
              <li key={menu.url} className="flex items-center space-x-2">
                <NavLink
                  to={menu.url}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-gray-600 rounded-full w-80 pl-5 py-1 ${
                      isActive
                        ? "font-semibold bg-leafblue-400 bg-opacity-50"
                        : ""
                    }`
                  }
                >
                  <>
                    <span>{menu.title}</span>
                  </>
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
