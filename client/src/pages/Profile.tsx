import Navbar from "../components/Navbar";
import avatar from "../assets/avatar.svg"
import { Link } from "react-router-dom";


const Profile = () => {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <section className="min-h-screen bg-[#faf9fc]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16">

  <h1 className="text-4xl font-bold text-[#292929] mb-10">
    My Profile
  </h1>

  <p className="text-gray-500 mt-2">
  Manage your account and track your task activity.
</p>

  <div className="bg-white rounded-xl shadow-sm p-10">

    {/* Profile Header */}
    <div className="flex flex-col items-center border-b border-gray-200 pb-8">

      <img
        src={avatar}
        alt="Profile Avatar"
        className="h-32 w-32 rounded-full"
      />

      <h2 className="mt-4 text-3xl font-bold text-[#292929]">
        {user.fullName}
      </h2>

      <p className="mt-3 max-w-md text-center text-gray-500">
        {user.bio || "No bio added yet."}
     </p>

     <Link
  to="/edit-profile"
  className="
    mt-5
    inline-block
    rounded-md
    bg-[#974FD0]
    px-6
    py-3
    text-white
    font-medium
    hover:bg-[#8844C3]
    transition
  "
>
  Edit Profile
</Link>

    </div>

    {/* Profile Information */}
    <div className="mt-10">

      <h3 className="text-2xl font-semibold text-[#292929] mb-6">
        Profile Information
      </h3>

      <div className="space-y-10">

        <div>
          <p className="text-sm text-gray-500">
            Full Name
          </p>

          <p className="text-xl font-medium text-[#292929]">
            {user.fullName}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Email Address
          </p>

          <p className="text-xl font-medium text-[#292929]">
            {user.email}
          </p>
        </div>

      </div>
    </div>

    {/* Task Overview */}
<div className="mt-12">

  <h3 className="text-2xl font-semibold text-[#292929] mb-6">
    Task Overview
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div className="rounded-lg border border-[#E5E7EB] p-6 text-center">
      <p className="text-gray-500">
        Total Tasks
      </p>

      <h2 className="mt-2 text-3xl font-bold text-[#974FD0]">
        0
      </h2>
    </div>

    <div className="rounded-lg border border-[#E5E7EB] p-6 text-center">
      <p className="text-gray-500">
        Completed
      </p>

      <h2 className="mt-2 text-3xl font-bold text-green-500">
        0
      </h2>
    </div>

    <div className="rounded-lg border border-[#E5E7EB] p-6 text-center">
      <p className="text-gray-500">
        Pending
      </p>

      <h2 className="mt-2 text-3xl font-bold text-red-500">
        0
      </h2>
    </div>

  </div>

</div>

  </div>

</main>
    </section>
  );
};

export default Profile;