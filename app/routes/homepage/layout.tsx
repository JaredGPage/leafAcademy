import { NavLink, Outlet } from "@remix-run/react";
import logo from "../../../images/leafLogo.png";
import { HomeIcon, UserIcon } from "@heroicons/react/outline";

const menus = [
  {
    title: "Home",
    url: "/homepage/home",
    icon: <HomeIcon className="w-8 h-8" />,
  },
  {
    title: "Account",
    url: "/homepage/account",
    icon: <UserIcon className="w-8 h-8" />,
  },
];

export default function HomeLayout() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col lg:flex-row h-screen w-full">
        <aside className="lg:w-72 w-full lg:border-r lg:p-12 p-1 lg:text-lg justify-center flex lg:block lg:flex-shrink-0 fixed bottom-0 left-0 right-0 lg:relative lg:top-auto lg:left-auto lg:bottom-auto lg:right-auto bg-white z-10">
          <picture className="mb-4 flex items-start mx-auto lg:ml-0 lg:w-full w-1/2  justify-center">
            <img
              className="flex items-center justify-center mx-auto w-24 lg:w-full h-auto"
              src={logo}
              alt="logo"
            />
          </picture>
          <ul className="lg:space-y-3 lg:ml-0 -ml-11 mb-4 mx-auto items-center lg:justify-center justify-start lg:w-full w-1/2 lg:mx-auto  mt-0 space-y-0 lg:space-x-0 space-x-2 flex lg:block">
            {menus.map((menu) => (
              <li
                key={menu.url}
                className="lg:flex lg:flex-row items-center justify-center lg:space-x-2 space-x-0"
              >
                <NavLink
                  to={menu.url}
                  className={({ isActive }) =>
                    `flex items-center justify-center lg:justify-start space-x-2 text-gray-600 rounded-full w-10 lg:w-80 lg:pl-5 py-1 ${
                      isActive
                        ? "font-semibold bg-leafblue-400 bg-opacity-50"
                        : ""
                    }`
                  }
                >
                  {/* Show icon on small screens and hide on large screens */}
                  <span className="block lg:hidden">{menu.icon}</span>
                  {/* Show title on large screens and hide on small screens */}
                  <span className="hidden lg:block">{menu.title}</span>
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
