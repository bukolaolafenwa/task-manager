import { Link, NavLink, type NavLinkRenderProps } from "react-router-dom";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
const navigate = useNavigate();

const token =
  localStorage.getItem("token");

const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const isLoggedIn = !!token;

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};

  const linkClass = ({ isActive }: NavLinkRenderProps
  ) =>
    `cursor-pointer whitespace-nowrap pb-1 text-[12px] font-semibold transition min-[390px]:text-[13px] min-[414px]:text-sm md:pb-2 md:text-lg ${
      isActive
        ? "border-b-2 border-purple-600 text-purple-600 md:border-b-4"
        : "text-[#292929] hover:text-purple-600"
    }`;

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <nav className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 py-4 min-[390px]:px-5 min-[414px]:px-6 md:h-[120px] md:flex-row md:items-center md:justify-between md:px-10 md:py-0 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="w-[105px] cursor-pointer min-[390px]:w-[115px] min-[414px]:w-[125px] md:w-[170px]"
            />
          </Link>

        {isLoggedIn && (
          <img
            src={user.profileImage || avatar}
            alt="avatar-img"
            className="h-10 w-10 min-[390px]:h-11 min-[390px]:w-11 min-[414px]:h-12 min-[414px]:w-12 md:hidden"
          />
        )}
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:flex-nowrap md:justify-end md:gap-10">
          <li>
            <NavLink to="/create-task" className={linkClass}>
              New Task
            </NavLink>
          </li>

          <li>
            <NavLink to="/tasks" className={linkClass}>
              All Tasks
            </NavLink>
          </li>

          
          {!isLoggedIn && (
  <>
    <li>
      <NavLink
        to="/login"
        className={linkClass}
      >
        Login
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          `cursor-pointer whitespace-nowrap rounded-md border border-[#974FD0] px-3 py-2 text-[12px] font-semibold transition min-[390px]:text-[13px] min-[414px]:px-4 min-[414px]:text-sm md:px-5 md:text-lg ${
            isActive
              ? "bg-[#974FD0] text-white"
              : "text-[#974FD0] hover:bg-[#974FD0] hover:text-white"
          }`
        }
      >
        Register
      </NavLink>
    </li>
  </>
)}


{isLoggedIn && (
  <li className="hidden md:flex items-center gap-3">
    <img
      src={avatar}
      alt="avatar-img"
      className="md:h-20 md:w-20"
    />

    <div className="flex flex-col">
      <span className="font-medium text-[#292929]">
        {user.fullName || user.name}
      </span>

      <button
        onClick={handleLogout}
        className="text-left text-[#974FD0] hover:underline"
      >
        Logout
      </button>
    </div>
  </li>
)}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;