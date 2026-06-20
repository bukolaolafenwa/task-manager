import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import avatar from "../assets/avatar.svg"
import { Link } from "react-router-dom";
import { getTasks } from "../services/taskService";


const Profile = () => {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const memberSince =
  user.createdAt
    ? new Date(
        user.createdAt
      ).toLocaleDateString(
        "en-US",
        {
          month: "long",
          year: "numeric",
        }
      )
    : "N/A";

  const [stats, setStats] =
  useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  const completionRate =
  stats.total > 0
    ? Math.round(
        (
          stats.completed /
          stats.total
        ) * 100
      )
    : 0;

  useEffect(() => {

  const fetchTaskStats =
    async () => {

      try {

        const response =
  await getTasks();

console.log("Tasks:", response);

const tasks =
  response.data;

const total =
  tasks.length;

const completed =
  tasks.filter(
    (task: any) =>
      task.completed
  ).length;

const pending =
  tasks.filter(
    (task: any) =>
      !task.completed
  ).length;

        setStats({
          total,
          completed,
          pending,
        });

      } catch (error) {

        console.error(
          "Failed to fetch tasks",
          error
        );

      }

    };

  fetchTaskStats();

}, []);

  return (
    <section className="min-h-screen bg-[#faf9fc]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16">

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
  src={
    user.profileImage || avatar
  }
  alt="Profile Avatar"
  className="
    h-32
    w-32
    rounded-full
    object-cover
  "
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

    
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  <div className="rounded-lg border border-[#E5E7EB] p-5">
    <p className="text-sm text-gray-500">
      Email Address
    </p>

    <p className="mt-2 text-lg font-medium text-gray-500">
      {user.email}
    </p>
  </div>

  <div className="rounded-lg border border-[#E5E7EB] p-5">
    <p className="text-sm text-gray-500">
      Member Since
    </p>

    <p className="mt-2 text-lg font-medium text-[#974FD0]">
      {memberSince}
    </p>
  </div>

  <div className="rounded-lg border border-[#E5E7EB] p-5">
    <p className="text-sm text-gray-500">
      Tasks Created
    </p>

    <p className="mt-2 text-lg font-medium text-[#974FD0]">
      {stats.total}
    </p>
  </div>

  <div className="rounded-lg border border-[#E5E7EB] p-5">
    <p className="text-sm text-gray-500">
      Completion Rate
    </p>

    <p className="mt-2 text-lg font-medium text-[#974FD0]">
      {completionRate}%
    </p>
  </div>

</div>

    </div>

    {/* Task Overview */}
<div className="mt-16">

  <h3 className="text-2xl font-semibold text-[#292929] mb-6">
    Task Overview
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div className="rounded-lg border border-[#E5E7EB] p-6 text-center">
      <p className="text-gray-500">
        Total Tasks
      </p>

      <h2 className="mt-2 text-3xl font-bold text-[#974FD0]">
  {stats.total}
      </h2>
    </div>

    <div className="rounded-lg border border-[#E5E7EB] p-6 text-center">
      <p className="text-gray-500">
        Completed
      </p>

      <h2 className="mt-2 text-3xl font-bold text-green-500">
  {stats.completed}
    </h2>
    </div>

    <div className="rounded-lg border border-[#E5E7EB] p-6 text-center">
      <p className="text-gray-500">
        Pending
      </p>

      <h2 className="mt-2 text-3xl font-bold text-red-500">
  {stats.pending}
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