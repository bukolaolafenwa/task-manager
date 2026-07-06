import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import illustration from "../assets/illustration.svg";
import logo from "../assets/logo.svg";
import { registerUser } from "../services/authService";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] =
  useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerError,
  setRegisterError] =
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

    setRegisterError("");

  const newErrors = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

    let isValid = true;

    // Validations
  if (!formData.fullName.trim()) {
  newErrors.fullName =
    "Full name is required";

  isValid = false;

} else if (
  formData.fullName.trim().length < 3
) {
  newErrors.fullName =
    "Full name must be at least 3 characters";

  isValid = false;
}


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


if (
  !formData.confirmPassword
) {
  newErrors.confirmPassword =
    "Please confirm your password";

  isValid = false;

} else if (
  formData.password !==
  formData.confirmPassword
) {
  newErrors.confirmPassword =
    "Passwords do not match";

  isValid = false;
}

setErrors(newErrors);

if (!isValid) {
  return;
}
    try {
      setLoading(true);

        await registerUser({
          fullName:
            formData.fullName,
          email:
            formData.email,
          password:
            formData.password,
        });

// setSuccessMessage(
//   "Account created successfully. Redirecting to login..."
// );

// navigate("/login", {
//   state: {
//     successMessage:
//       "Account created successfully. Please log in.",
//   },
// });

// setTimeout(() => {
//   navigate("/login");
// }, 0);

navigate("/login", {
  state: {
    successMessage:
      "Account created successfully. Please log in.",
  },
});

    } catch (error) {
      console.error(error);

      setRegisterError(
  "Registration failed"
);
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
              className="mb-10 flex items-center md:mb-12"
            >
              <img
                src={logo}
                alt="TaskDuty logo"
                className="h-10 w-auto min-[414px]:h-11 md:h-12 pb-4"
              />
            </Link>

            <h1 className="text-xl font-bold text-[#292929] md:text-3xl">
              Create Account
            </h1>

            <p className="mt-5 text-base leading-7 text-[#4F4F4F] md:mt-6 md:text-xl md:leading-8">
              Create an account to get started.
            </p>

            <form
              noValidate
              onSubmit={handleSubmit}
              className="mt-10 space-y-10 md:mt-12 md:space-y-12"
            >
              {/* Full Name */}
              <fieldset className={`rounded-md border-2 bg-white px-4 pb-3 pt-1 transition focus-within:border-[#974FD0]
${
  errors.fullName
    ? "border-red-500"
    : "border-[#D5D1D8]"
}
`}>
                <legend className="px-2 text-lg font-medium text-gray-600 md:text-xl">
                  Full Name
                </legend>

                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={
                    formData.fullName
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="w-full bg-transparent px-2 py-2 text-base font-medium text-[#292929] outline-none placeholder:font-normal placeholder:text-[#9CA3AF] min-[414px]:py-3 min-[414px]:text-lg md:text-xl"
                />
              </fieldset>
              {
  errors.fullName && (
    <p className="mt-2 text-sm text-red-500">
      {errors.fullName}
    </p>
  )
}

              {/* Email */}
              <fieldset className={`rounded-md border-2 bg-white px-4 pb-3 pt-1 transition focus-within:border-[#974FD0]
${
  errors.email
    ? "border-red-500"
    : "border-[#D5D1D8]"
}
`}>
                <legend className="px-2 text-lg font-medium text-[#292929] md:text-xl text-gray-600">
                  Email
                </legend>

                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="w-full bg-transparent px-2 py-2 text-base font-medium text-[#292929] outline-none placeholder:font-normal placeholder:text-[#9CA3AF] min-[414px]:py-3 min-[414px]:text-lg md:text-xl"
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
                <legend className="px-2 text-lg font-medium md:text-xl text-gray-600">
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
    autoComplete="new-password"
    placeholder="Enter your password"
    value={formData.password}
    onChange={handleChange}
    required
    className="w-full bg-transparent px-2 py-2 text-base font-medium text-[#292929] outline-none placeholder:font-normal placeholder:text-[#9CA3AF] min-[414px]:py-3 min-[414px]:text-lg md:text-xl"
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

{/* Confirm Password */}
<div>
  <fieldset
    className={`rounded-md border-2 bg-white px-4 pb-3 pt-1 transition focus-within:border-[#974FD0] ${
      errors.confirmPassword
        ? "border-red-500"
        : "border-[#D5D1D8]"
    }`}
  >
    <legend className="px-2 text-lg font-medium md:text-xl text-gray-600">
      Confirm Password
    </legend>

    <div className="flex items-center">
      <input
        type={showConfirmPassword ? "text" : "password"}
        id="confirmPassword"
        name="confirmPassword"
        autoComplete="new-password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className="w-full bg-transparent px-2 py-2 text-base font-medium text-[#292929] outline-none placeholder:font-normal placeholder:text-[#9CA3AF] min-[414px]:py-3 min-[414px]:text-lg md:text-xl"
      />

      <button
        type="button"
        onClick={() =>
          setShowConfirmPassword(!showConfirmPassword)
        }
        aria-label={
          showConfirmPassword
            ? "Hide confirmation password"
            : "Show confirmation password"
        }
        className="pr-2 text-gray-500 hover:text-[#974FD0]"
      >
        {showConfirmPassword ? (
          <EyeOff size={22} />
        ) : (
          <Eye size={22} />
        )}
      </button>
    </div>
  </fieldset>

  {errors.confirmPassword && (
    <p className="mt-2 text-sm text-red-500">
      {errors.confirmPassword}
    </p>
  )}
</div>

{registerError && (
  <p className="rounded-md bg-red-50 p-3 text-center text-red-500">
    {registerError}
  </p>
)}

{/* Button */}
<div className="pt-8 min-[414px]:pt-6">
  <button
  type="submit"
  disabled={loading}
  className={`
    h-14
    w-full
    rounded-md
    bg-[#974FD0]
    text-lg
    font-semibold
    text-white
    transition
    ${
      loading
        ? "cursor-not-allowed opacity-60"
        : "cursor-pointer hover:bg-green-300 hover:text-purple-500 hover:-translate-y-1 md:hover:scale-105"
    }
    focus:outline-none
    focus:ring-4
    focus:ring-[#974FD0]/25
    min-[414px]:h-16
    min-[414px]:text-xl
  `}
>
  {loading
    ? "Creating Account..."
    : "Register"}
</button>
</div>
</form>

            <p className="pt-4 text-center text-base text-[#4F4F4F] md:text-xl">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="font-semibold text-[#974FD0] hover:underline"
              >
                Sign In
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

export default Register;