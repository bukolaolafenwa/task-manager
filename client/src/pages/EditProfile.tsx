import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Eye, EyeOff } from "lucide-react";
import { updateProfile } from "../services/authService";


const EditProfile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [formData, setFormData] =
    useState({
      fullName:
        user.fullName ||
        "",
      bio: user.bio || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [errors, setErrors] =
    useState({
      fullName: "",
      bio: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

const handleSubmit = async () => {
  const newErrors = {
    fullName: "",
    bio: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  let isValid = true;

  // Full Name Validation
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

  // Password Validation
  if (
    formData.newPassword ||
    formData.confirmPassword
  ) {
    if (!formData.currentPassword) {
      newErrors.currentPassword =
        "Current password is required";
      isValid = false;
    }

    if (
      formData.newPassword.length < 6
    ) {
      newErrors.newPassword =
        "Password must be at least 6 characters";
      isValid = false;
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Confirm password must match the new password";
      isValid = false;
    }
  }

  setErrors(newErrors);

  if (!isValid) {
    return;
  } 
  try {

  const token =
    localStorage.getItem(
      "token"
    );

  if (!token) {
    alert(
      "Please login again"
    );
    return;
  }

  setIsSaving(true);

  const response =
    await updateProfile(
      token,
      {
        fullName:
          formData.fullName,
        bio:
          formData.bio,
        currentPassword:
          formData.currentPassword,
        newPassword:
          formData.newPassword,
      }
    );

  const updatedUser = {
    ...user,
    fullName:
      response.data.fullName,
    bio:
      response.data.bio,
  };

  localStorage.setItem(
    "user",
    JSON.stringify(
      updatedUser
    )
  );

//   navigate("/profile");

setFormData(prev => ({
  ...prev,
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}));

setSuccessMessage(
  "Profile updated successfully!"
);

setTimeout(() => {
  navigate("/profile");
}, 1500);
  
  } catch (error: any) {

  const message =
    error.response?.data?.message;

  if (
    message ===
    "Current password is incorrect"
  ) {
    setErrors(prev => ({
      ...prev,
      currentPassword:
        "Current password is incorrect",
    }));

    (
      document.querySelector(
        'input[name="currentPassword"]'
      ) as HTMLInputElement
    )?.focus();

  } else {

    alert(
      message ||
      "Failed to update profile"
    );

  }

} finally {

  setIsSaving(false);

}
};

  return (
    <section className="min-h-screen bg-[#faf9fc]">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold text-[#292929] mb-8">
          Edit Profile
        </h1>

        <p className="text-gray-500 mb-10">
  Update your profile information and account security settings.
</p>
{successMessage && (
  <div
    className="
      mb-6
      rounded-md
      bg-green-100
      border
      border-green-300
      text-green-700
      px-4
      py-3
    "
  >
    {successMessage}
  </div>
)}


        <div className="bg-white rounded-xl shadow-sm p-10">

          {/* PROFILE INFORMATION */}

   <h2 className="text-2xl font-semibold text-[#292929] mb-6">
  Profile Information
</h2>

          {/* Full Name */}
          <div className="mb-8">
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="
                w-full
                border
                border-[#D5D1D8]
                rounded-md
                px-4
                py-3
                outline-none
                focus:border-[#974FD0]
              "
            />

            {errors.fullName && (
              <p className="mt-2 text-red-500 text-sm">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="mb-10">
            <label className="block mb-2 font-medium">
              Bio
            </label>

            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              className="
                w-full
                border
                border-[#D5D1D8]
                rounded-md
                px-4
                py-3
                outline-none
                focus:border-[#974FD0]
                resize-none
              "
            />

            {errors.bio && (
              <p className="mt-2 text-red-500 text-sm">
                {errors.bio}
              </p>
            )}
          </div>

          {/* SECURITY */}

          <div className="border-t border-gray-200 pt-10 mt-10">
            <h2 className="text-2xl font-semibold text-[#292929] mb-6">
            Security
            </h2>

          {/* Current Password */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Current Password
            </label>

          <div className="relative">

  <input
    type={
      showCurrentPassword
        ? "text"
        : "password"
    }
    name="currentPassword"
    value={formData.currentPassword}
    onChange={handleChange}
    className="
      w-full
      border
      border-[#D5D1D8]
      rounded-md
      px-4
      py-3
      pr-12
      outline-none
      focus:border-[#974FD0]
    "
  />

  <button
    type="button"
    onClick={() =>
      setShowCurrentPassword(
        !showCurrentPassword
      )
    }
    className="
      absolute
      right-4
      cursor-pointer
      top-1/2
      -translate-y-1/2
      text-gray-500
    "
  >
    {showCurrentPassword ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} />
    )}
  </button>

</div>

    {errors.currentPassword && (
        <p className="mt-2 text-red-500 text-sm">
            {errors.currentPassword}
              </p>
            )}
          </div>


      {/* New Password */}
<div className="mb-6">
  <label className="block mb-2 font-medium">
    New Password
  </label>

  <div className="relative">
    <input
      type={
        showNewPassword
          ? "text"
          : "password"
      }
      name="newPassword"
      value={formData.newPassword}
      onChange={handleChange}
      className="
        w-full
        border
        border-[#D5D1D8]
        rounded-md
        px-4
        py-3
        pr-12
        outline-none
        focus:border-[#974FD0]
      "
    />

    <button
      type="button"
      onClick={() =>
        setShowNewPassword(
          !showNewPassword
        )
      }
      className="
        absolute
        right-4
        cursor-pointer
        top-1/2
        -translate-y-1/2
        text-gray-500
      "
    >
      {showNewPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  </div>

  {errors.newPassword && (
    <p className="mt-2 text-red-500 text-sm">
      {errors.newPassword}
    </p>
  )}
</div>

          
         {/* Confirm Password */}
<div className="mb-10">
  <label className="block mb-2 font-medium">
    Confirm New Password
  </label>

  <div className="relative">
    <input
      type={
        showConfirmPassword
          ? "text"
          : "password"
      }
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      className="
        w-full
        border
        border-[#D5D1D8]
        rounded-md
        px-4
        py-3
        pr-12
        outline-none
        focus:border-[#974FD0]
      "
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(
          !showConfirmPassword
        )
      }
      className="
        absolute
        right-4
        cursor-pointer
        -translate-y-1/2
        text-gray-500
      "
    >
      {showConfirmPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  </div>

  {errors.confirmPassword && (
    <p className="mt-2 text-red-500 text-sm">
      {errors.confirmPassword}
    </p>
  )}
</div>
</div>


          {/* Save Button */}

<div className="mt-8">
    <button
  type="button"
  onClick={handleSubmit}
  disabled={isSaving}
  className={`
    w-full
    h-14
    rounded-md
    text-white
    font-semibold
    transition
    ${
      isSaving
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#974FD0] hover:bg-[#8844C3]"
    }
  `}
>
  {isSaving
    ? "Saving Changes..."
    : "Save Changes"}
</button>
</div>

        </div>

      </main>
    </section>
  );
};

export default EditProfile;