import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const SideBar = ({ showSidebar }) => {
  const location = useLocation();
  const menuItems = [
    {
      title: "Home",
      path: "/home",
    },
    {
      title: "Posted",
      path: "/posted",
    },
    {
      title: "AddNews",
      path: "/add",
    },
    {
      title: "Logout",
      path: "/logout",
    },
  ];

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen max-h-full transition-all bg-primary h-screen sm:h-full flex flex-col overflow-hidden ${
        showSidebar ? "w-48" : "w-0"
      }`}
    >
      <div>
        <h1 className="text-2xl font-bold mt-7 ml-10 text-gray-400">
          NEWS-APP
        </h1>
      </div>
      <div className="flex flex-col mt-20">
        {menuItems.map((item, i) => {
          return item.title !== "Logout" ? (
            <Link
              to={`${item.path}`}
              className={`pl-10 py-5 text-gray-400 hover:bg-gray-50 hover:text-gray-700 text-sm
              ${
                location.pathname.includes(item.path) &&
                "bg-[#145c2aaf] text-yellow-200 font-bold"
              }
              `}
              key={i}
            >
              {item.title}
            </Link>
          ) : (
            <span
              className={`pl-10 py-5 text-gray-400 hover:bg-gray-50 hover:text-gray-700 text-sm
            ${
              location.pathname.includes(item.path) &&
              "bg-[#145c2aaf] text-yellow-200 font-bold"
            } cursor-pointer
            `}
              onClick={logout}
            >
              Logout
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
