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
    <div className="flex flex-col h-screen">
      <div className="flex flex-col lg:flex-row h-screen w-full">
        <aside className="lg:w-72 lg:border-r lg:p-12 p-1 lg:text-lg flex lg:block lg:flex-shrink-0 fixed bottom-0 left-0 right-0 lg:relative lg:top-auto lg:left-auto lg:bottom-auto lg:right-auto bg-white z-10">
          <picture className="mb-4 flex items-center lg:mx-auto justify-center">
            <img className="w-28 lg:w-full h-auto" src={logo} alt="logo" />
          </picture>
          <ul className="lg:space-y-3 lg:mt-0 mt-6 space-y-0 lg:space-x-0 space-x-2 flex lg:block">
            {menus.map((menu) => (
              <li
                key={menu.url}
                className="lg:flex lg:flex-row items-center lg:space-x-2 space-x-0"
              >
                <NavLink
                  to={menu.url}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-gray-600 rounded-full w-24 lg:w-80 pl-5 py-1 ${
                      isActive
                        ? "font-semibold bg-leafblue-400 bg-opacity-50"
                        : ""
                    }`
                  }
                >
                  <span>{menu.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
