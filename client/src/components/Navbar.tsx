import {
  Link,
  NavLink,
  useNavigate,
  type NavLinkRenderProps,
} from "react-router-dom";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }: NavLinkRenderProps) =>
    `cursor-pointer whitespace-nowrap pb-1 text-xs font-semibold transition
    min-[390px]:text-[13px]
    min-[414px]:text-sm
    md:pb-2 md:text-lg
    ${
      isActive
        ? "border-b-2 border-purple-600 text-purple-600 md:border-b-4"
        : "text-[#292929] hover:text-purple-600"
    }`;

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <nav className="w-full">
        {/* Navbar container */}
        <div className="mx-auto box-border w-full max-w-8xl px-6 sm:px-8 md:px-10 lg:px-12">
          <div className="flex min-h-[100px] w-full flex-col gap-6 py-5 md:min-h-[120px] md:flex-row md:items-center md:justify-between md:gap-8 md:py-0">
            {/* Logo and mobile avatar */}
            <div className="flex w-full items-center justify-between md:w-auto md:shrink-0">
              <Link to="/" aria-label="Go to home page">
                <img
                  src={logo}
                  alt="TaskDuty logo"
                  className="w-[105px] cursor-pointer min-[390px]:w-[115px] min-[414px]:w-[125px] sm:w-[140px] md:w-[170px]"
                />
              </Link>

              {isLoggedIn && (
                <Link
                  to="/profile"
                  aria-label="View profile"
                  className="md:hidden"
                >
                  <img
                    src={user.profileImage || avatar}
                    alt={`${user.fullName || "User"}'s avatar`}
                    className="h-10 w-10 rounded-full object-cover min-[390px]:h-11 min-[390px]:w-11 min-[414px]:h-12 min-[414px]:w-12"
                  />
                </Link>
              )}
            </div>

            {/* Navigation links */}
            <ul className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-4 pb-1 sm:gap-x-8 md:w-auto md:flex-nowrap md:justify-end md:gap-10 md:pb-0">
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

              <li>
              <NavLink to="/trash" className={linkClass}>
              Trash
              </NavLink>
              </li>

              {!isLoggedIn && (
                <>
                  <li>
                    <NavLink to="/login" className={linkClass}>
                      Login
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `cursor-pointer whitespace-nowrap rounded-md border border-[#974FD0] px-3 py-2 text-xs font-semibold transition
                        min-[390px]:text-[13px]
                        min-[414px]:px-4 min-[414px]:text-sm
                        md:px-5 md:py-3 md:text-lg
                        ${
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
                <>
                  {/* Mobile logout */}
                  <li className="md:hidden">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="whitespace-nowrap text-xs font-semibold text-[#974FD0] transition hover:underline min-[390px]:text-[13px] min-[414px]:text-sm"
                    >
                      Logout
                    </button>
                  </li>

                  {/* Desktop profile */}
                  <li className="hidden items-center gap-4 md:flex">
                    <Link
                      to="/profile"
                      className="flex min-w-0 items-center gap-3"
                    >
                      <img
                        src={user.profileImage || avatar}
                        alt={`${user.fullName || "User"}'s avatar`}
                        className="h-16 w-16 shrink-0 rounded-full object-cover lg:h-20 lg:w-20"
                      />

                      <span className="max-w-[140px] truncate font-medium text-[#292929]">
                        {user.fullName || "User"}
                      </span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="whitespace-nowrap text-left text-[#974FD0] transition hover:underline"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;