import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";

const Navbar = () => {
  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <nav className="flex h-[80px] w-full items-center justify-between px-4 min-[390px]:px-5 min-[414px]:px-6 md:h-[120px] md:px-10 lg:px-32">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-[95px] cursor-pointer min-[390px]:w-[105px] min-[414px]:w-[115px] md:w-[170px]"
          />
        </Link>

        <ul className="flex items-center gap-3 text-[11px] font-semibold min-[390px]:gap-4 min-[390px]:text-[12px] min-[414px]:gap-5 min-[414px]:text-[13px] md:gap-10 md:text-lg md:tracking-wide">
          <li>
            <NavLink
              to="/create-task"
              className={({ isActive }) =>
                `cursor-pointer pb-2 transition ${
                  isActive
                    ? "border-b-4 border-purple-600 text-gray-600"
                    : "hover:text-purple-600"
                }`
              }
            >
              New Task
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `cursor-pointer pb-2 transition ${
                  isActive
                    ? "border-b-4 border-purple-600 text-gray-600"
                    : "hover:text-purple-600"
                }`
              }
            >
              All Tasks
            </NavLink>
          </li>

          <li>
            <img
              src={avatar}
              alt="avatar-img"
              className="h-10 w-10 min-[390px]:h-11 min-[390px]:w-11 min-[414px]:h-12 min-[414px]:w-12 md:h-20 md:w-20"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;