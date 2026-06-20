import { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import illustration from "../assets/illustration.svg";
import logo from "../assets/logo.svg";
import { loginUser } from "../services/authService";
import { Eye, EyeOff } from "lucide-react";


const Login = () => {
  const navigate = useNavigate();

  const location =
  useLocation();

  const successMessage =
  location.state?.successMessage;

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] = useState(false);

 const [errors, setErrors] =
  useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] =
  useState("");

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } =
    e.target;

  setFormData({
    ...formData,
    [name]: value,
  });

  setErrors({
    ...errors,
    [name]: "",
  });
};

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoginError("");

    const newErrors = {
    email: "",
    password: "",
};

    let isValid = true;

// Validations
const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!formData.email.trim()) {
  newErrors.email =
    "Email is required";

  isValid = false;

} else if (
  !emailRegex.test(
    formData.email
  )
) {
  newErrors.email =
    "Enter a valid email";

  isValid = false;
}


if (!formData.password) {
  newErrors.password =
    "Password is required";

  isValid = false;

} else if (
  formData.password.length < 6
) {
  newErrors.password =
    "Password must be at least 6 characters";

  isValid = false;
}
setErrors(newErrors);

if (!isValid) {
  return;
}
    try {
      setLoading(true);

      const response =
        await loginUser(formData);

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.user
        )
      );

      navigate("/tasks");
    } catch (error: any) {

  const message =
    error.response?.data?.message ||
    "Incorrect password";

  setErrors({
    email: "",
    password: message,
  });

} finally {

  setLoading(false);

}

  };

  return (
    <section className="min-h-screen bg-[#FAF9FC]">
      <main className="flex min-h-screen w-full flex-col-reverse md:grid md:grid-cols-2">

        {/* Form Section */}
        <div className="flex min-h-[70vh] items-center justify-center bg-white px-5 py-12 min-[390px]:px-6 min-[414px]:px-7 md:min-h-screen md:px-12 md:py-16 lg:px-20">
          <div className="w-full max-w-[560px]">

            <Link
              to="/"
              className="mb-10 flex items-center md:mb-14"
            >
              <img
                src={logo}
                alt="TaskDuty logo"
                className="h-8 w-auto min-[414px]:h-10 mb-6"
              />
            </Link>

            <h1 className="text-base md:text-3xl font-bold text-[#292929]">
              Login
            </h1>

            <p className="mt-4 text-base text-[#4F4F4F] md:mt-6 md:text-xl">
              Welcome back. Sign in to continue.
            </p>
            {
  successMessage && (
    <p className="mt-4 rounded-md bg-green-50 p-3 text-center text-green-600">
      {successMessage}
    </p>
  )
}

            <form
              noValidate
              onSubmit={handleSubmit}
              className="mt-10 space-y-10 md:mt-12 md:space-y-12"
            >
              {/* Email */}
              <fieldset className={`rounded-md border-2 bg-white px-4 pb-2 pt-1 transition focus-within:border-[#974FD0]
${
  errors.email
    ? "border-red-500"
    : "border-[#D5D1D8]"
}
`}>
                <legend className="px-2 text-lg font-medium text-gray-500 md:text-xl">
                  Email
                </legend>

                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent px-2 py-2 text-base font-medium text-[#292929] outline-none placeholder:font-medium placeholder:text-gray-300 min-[414px]:py-4 min-[414px]:text-lg md:text-xl"
                />
              </fieldset>
           {
  errors.email && (
    <p className="mt-2 text-sm text-red-500">
      {errors.email}
    </p>
  )
}


              {/* Password */}
              <fieldset className={`rounded-md border-2 bg-white px-4 pb-3 pt-1 transition focus-within:border-[#974FD0]
${
  errors.password
    ? "border-red-500"
    : "border-[#D5D1D8]"
}
`}>
                <legend className="px-2 text-lg font-medium text-gray-500 md:text-xl">
                  Password
                </legend>

<div className="flex items-center">
  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    id="password"
    name="password"
    autoComplete="current-password"
    placeholder="Enter your password"
    value={formData.password}
    onChange={handleChange}
    required
    className="w-full bg-transparent px-2 py-3 text-base font-medium text-[#292929] outline-none placeholder:font-normal placeholder:text-gray-300 min-[414px]:py-4 min-[414px]:text-lg md:text-xl"
  />

  <button
    type="button"
    onClick={() =>
      setShowPassword(
        !showPassword
      )
    }
    className="pr-2 text-gray-500 hover:text-[#974FD0]"
  >
    {showPassword ? (
      <EyeOff size={22} />
    ) : (
      <Eye size={22} />
    )}
  </button>
</div>
              </fieldset>
{
  errors.password && (
    <p className="mt-2 text-sm text-red-500">
      {errors.password}
    </p>
  )
}


              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <label className="flex cursor-pointer items-center gap-3 text-sm text-[#292929] min-[390px]:text-base md:text-lg">
                  <input
                    type="checkbox"
                    name="remember"
                    className="h-5 w-5 cursor-pointer rounded border-[#D5D1D8] accent-[#974FD0]"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#974FD0] hover:underline min-[390px]:text-base md:text-lg"
                >
                  Forgot password?
                </Link>
              </div>

                {
        loginError && (
        <p className="rounded-md bg-red-50 p-3 text-center text-red-500">
      {loginError}
      </p>
      )
    }

    <div className="pt-5 min-[414px]:pt-12 md:pt-6">
<button
  type="submit"
  disabled={loading}
  className={`
    h-12
    w-full
    rounded-md
    bg-[#974FD0]
    text-lg
    min-[414px]:h-16
    min-[414px]:text-xl
    font-semibold
    text-white
    transition
    ${
      loading
        ? "cursor-not-allowed opacity-60"
        : "cursor-pointer hover:bg-green-300 hover:text-purple-500 hover:-translate-y-1 md:hover:scale-105"
    }
  `}
>
  {loading
    ? "Logging in..."
    : "Login"}
</button>
</div>

            </form>

            <p className="pt-6 text-center text-base text-[#4F4F4F] md:text-xl">
              Don't have an account?{" "}
              <Link
                to="/create-account"
                className="font-semibold text-[#974FD0] hover:underline"
              >
                Create one
              </Link>
            </p>

          </div>
        </div>

        {/* Illustration */}
        <div className="flex min-h-[30vh] items-center justify-center bg-[#FAF9FC] px-6 py-6 md:min-h-screen md:px-10 md:py-16 lg:px-16">
          <img
            src={illustration}
            alt="Task management illustration"
            className="max-h-[230px] w-full max-w-[230px] object-contain min-[390px]:max-w-[250px] min-[414px]:max-w-[270px] md:max-h-[620px] md:max-w-full"
          />
        </div>

      </main>
    </section>
  );
};

export default Login;