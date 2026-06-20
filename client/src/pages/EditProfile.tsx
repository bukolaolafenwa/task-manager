import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Eye, EyeOff } from "lucide-react";
import { updateProfile } from "../services/authService";
import { uploadImageToCloudinary } from "../services/cloudinaryService";
import { updateProfileImage} from "../services/authService";
import avatar from "../assets/avatar.svg";


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
  const [imagePreview, setImagePreview] = useState(user.profileImage || avatar);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

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


const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const file =
    e.target.files?.[0];

  if (!file) return;

  try {

    setIsUploadingImage(true);

    // Preview immediately
    setImagePreview(
      URL.createObjectURL(file)
    );

    // Upload to Cloudinary
    const imageUrl =
      await uploadImageToCloudinary(
        file
      );

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) return;

    // Save URL to MongoDB
    const response =
      await updateProfileImage(
        token,
        imageUrl
      );

    // Update localStorage
    const updatedUser = {
      ...user,
      profileImage:
        response.profileImage,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(
        updatedUser
      )
    );

    setImagePreview(
      response.profileImage
    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to upload image"
    );

  } finally {

    setIsUploadingImage(
      false
    );

  }
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

setFormData(prev => ({
  ...prev,
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}));

  navigate("/profile");

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
  <section className="min-h-screen bg-[#FAF9FC]">
    <Navbar />

    <main className="w-full py-16 md:py-24 lg:py-28 md:flex md:flex-col md:items-center md:justify-center">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-8 lg:px-10">
        <header className="mb-14 md:mb-20">
          <h1 className="text-3xl font-bold text-[#292929] md:text-4xl">
            Edit Profile
          </h1>

          <p className="mt-3 text-gray-500 md:text-xl">
            Update your profile information and account security settings.
          </p>
        </header>

        <div className="rounded-xl bg-white p-5 shadow-sm sm:p-8 md:p-12">
          <h2 className="mb-14 text-2xl font-semibold text-[#292929]">
            Profile Information
          </h2>

          <div className="mb-16 flex flex-col items-center">
            <img
              src={imagePreview}
              alt="Profile"
              className="h-28 w-28 rounded-full border-4 border-[#F4ECFB] object-cover sm:h-32 sm:w-32"
            />

            <label className="mt-5 cursor-pointer rounded-md bg-[#F4ECFB] px-5 py-3 font-medium text-[#974FD0] transition hover:bg-[#EADCF7]">
              {isUploadingImage ? "Uploading..." : "Change Photo"}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploadingImage}
                className="hidden"
              />
            </label>
          </div>

          {/* Profile fields */}
          <div className="flex w-full flex-col gap-8 min-[414px]:gap-10 md:gap-16">
            {/* Full Name */}
            <div>
              <fieldset className="min-w-0 rounded-md border border-[#D5D1D8] px-3 pb-2 transition focus-within:border-[#974FD0] sm:px-5 sm:pb-3">
                <legend
                  id="fullNameLegend"
                  className="px-2 font-medium text-gray-500 md:text-xl md:font-normal"
                >
                  Full Name
                </legend>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  aria-labelledby="fullNameLegend"
                  className="w-full border-none bg-transparent py-3 outline-none placeholder:text-gray-300 md:h-12 md:placeholder:text-xl"
                />
              </fieldset>

              {errors.fullName && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Bio */}
            <div>
              <fieldset className="min-w-0 rounded-md border border-[#D5D1D8] px-3 pb-2 transition focus-within:border-[#974FD0] sm:px-5 sm:pb-3">
                <legend
                  id="bioLegend"
                  className="px-2 font-medium text-gray-500 md:text-xl md:font-normal"
                >
                  Bio
                </legend>

                <textarea
                  name="bio"
                  rows={5}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  aria-labelledby="bioLegend"
                  className="min-h-[140px] w-full resize-none border-none bg-transparent py-3 outline-none placeholder:text-gray-300 min-[414px]:min-h-[160px] md:min-h-[180px] md:placeholder:text-xl"
                />
              </fieldset>

              {errors.bio && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.bio}
                </p>
              )}
            </div>
          </div>

          {/* Security */}
          <div className="mt-16 border-t border-gray-200 pt-14 md:mt-20 md:pt-16">
            <h2 className="mb-14 text-2xl font-semibold text-[#292929]">
              Security
            </h2>

            {/* Password fields */}
            <div className="flex w-full flex-col gap-8 min-[414px]:gap-10 md:gap-16">
              {/* Current Password */}
              <div className="flex w-full flex-col gap-8 min-[414px]:gap-10 md:gap-16">
                <fieldset className="min-w-0 rounded-md border border-[#D5D1D8] px-3 pb-2 transition focus-within:border-[#974FD0] sm:px-5 sm:pb-3">
                  <legend
                    id="currentPasswordLegend"
                    className="px-2 font-medium text-gray-500 md:text-xl md:font-normal"
                  >
                    Current Password
                  </legend>

                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="Enter your current password"
                      aria-labelledby="currentPasswordLegend"
                      className="w-full border-none bg-transparent py-3 pr-12 outline-none placeholder:text-gray-300 md:h-12 md:placeholder:text-xl"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      aria-label={
                        showCurrentPassword
                          ? "Hide current password"
                          : "Show current password"
                      }
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#974FD0]"
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </fieldset>

                {errors.currentPassword && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <fieldset className="min-w-0 rounded-md border border-[#D5D1D8] px-3 pb-2 transition focus-within:border-[#974FD0] sm:px-5 sm:pb-3">
                  <legend
                    id="newPasswordLegend"
                    className="px-2 font-medium text-gray-500 md:text-xl md:font-normal"
                  >
                    New Password
                  </legend>

                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Enter a new password"
                      aria-labelledby="newPasswordLegend"
                      className="w-full border-none bg-transparent py-3 pr-12 outline-none placeholder:text-gray-300 md:h-12 md:placeholder:text-xl"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword(!showNewPassword)
                      }
                      aria-label={
                        showNewPassword
                          ? "Hide new password"
                          : "Show new password"
                      }
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#974FD0]"
                    >
                      {showNewPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </fieldset>

                {errors.newPassword && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col mb-20">
                <fieldset className="min-w-0 rounded-md border border-[#D5D1D8] px-3 pb-2 transition focus-within:border-[#974FD0] sm:px-5 sm:pb-3">
                  <legend
                    id="confirmPasswordLegend"
                    className="px-2 font-medium text-gray-500 md:text-xl md:font-normal"
                  >
                    Confirm New Password
                  </legend>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your new password"
                      aria-labelledby="confirmPasswordLegend"
                      className="w-full border-none bg-transparent py-3 pr-12 outline-none placeholder:text-gray-300 md:h-12 md:placeholder:text-xl"
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
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#974FD0]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
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
            </div>
          </div>

  <div className="flex flex-col items-center justify-center py-10">
     <button
  type="button"
  onClick={handleSubmit}
  disabled={isSaving || isUploadingImage}
  className={`
    mt-10
    h-14
    w-full
    rounded-md
    font-semibold
    text-white
    transition
    min-[414px]:h-16
    min-[414px]:text-xl
    ${
      isSaving || isUploadingImage
        ? "cursor-not-allowed opacity-60 bg-gray-400"
        : "cursor-pointer hover:bg-green-300 hover:text-purple-500 hover:-translate-y-1 md:hover:scale-105 bg-[#974FD0]"
    }
  `}
>
  {isSaving
    ? "Saving Changes..."
    : "Save Changes"}
</button>
  </div>
        </div>
      </div>
    </main>
  </section>
);
 
};

export default EditProfile;