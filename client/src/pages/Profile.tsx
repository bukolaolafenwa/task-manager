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
  <section className="min-h-screen bg-[#FAF9FC]">
    <Navbar />

    <main className="w-full py-16 md:py-24 md:flex md:flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-8 lg:px-10">
        <header className="mb-12 md:mb-16">
          <h1 className="text-3xl font-bold text-[#292929] md:text-4xl">
            My Profile
          </h1>

          <p className="mt-3 text-gray-500 md:text-lg">
            Manage your account and track your task activity.
          </p>
        </header>

        {/* Main white card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-10 md:p-14 lg:p-16">
          {/* Profile Header */}
          <div className="flex flex-col items-center border-b border-gray-200 pb-12 md:pb-16">
            <img
              src={user.profileImage || avatar}
              alt={`${user.fullName || "User"}'s profile`}
              className="h-32 w-32 rounded-full object-cover md:h-36 md:w-36"
            />

            <h2 className="mt-6 text-center text-2xl font-bold text-[#292929] md:text-3xl">
              {user.fullName || "User"}
            </h2>

            <p className="mt-4 max-w-lg text-center text-gray-500 md:text-lg">
              {user.bio || "No bio added yet."}
            </p>

            <Link
              to="/edit-profile"
              className="mt-8 inline-block rounded-md bg-[#974FD0] px-8 py-4 font-medium text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-green-300 hover:text-purple-500 "
            >
              Edit Profile
            </Link>
          </div>

          {/* Profile Information */}
          <div className="mt-14 md:mt-20">
            <h3 className="mb-8 text-2xl font-semibold text-[#292929] md:mb-10">
              Profile Information
            </h3>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
              <div className="flex min-h-[140px] flex-col justify-center rounded-xl border border-[#E5E7EB] p-6 sm:p-8 md:min-h-[160px] md:p-10">
                <p className="text-sm text-gray-500 md:text-base">
                  Email Address
                </p>

                <p className="mt-4 break-words text-lg font-medium text-gray-700 md:text-xl">
                  {user.email || "N/A"}
                </p>
              </div>

              <div className="flex min-h-[140px] flex-col justify-center rounded-xl border border-[#E5E7EB] p-6 sm:p-8 md:min-h-[160px] md:p-10">
                <p className="text-sm text-gray-500 md:text-base">
                  Member Since
                </p>

                <p className="mt-4 text-lg font-medium text-[#974FD0] md:text-xl">
                  {memberSince}
                </p>
              </div>

              <div className="flex min-h-[140px] flex-col justify-center rounded-xl border border-[#E5E7EB] p-6 sm:p-8 md:min-h-[160px] md:p-10">
                <p className="text-sm text-gray-500 md:text-base">
                  Tasks Created
                </p>

                <p className="mt-4 text-lg font-medium text-[#974FD0] md:text-xl">
                  {stats.total}
                </p>
              </div>

              <div className="flex min-h-[140px] flex-col justify-center rounded-xl border border-[#E5E7EB] p-6 sm:p-8 md:min-h-[160px] md:p-10">
                <p className="text-sm text-gray-500 md:text-base">
                  Completion Rate
                </p>

                <p className="mt-4 text-lg font-medium text-[#974FD0] md:text-xl">
                  {completionRate}%
                </p>
              </div>
            </div>
          </div>

          {/* Task Overview */}
          <div className="mt-16 md:mt-24">
            <h3 className="mb-8 text-2xl font-semibold text-[#292929] md:mb-10">
              Task Overview
            </h3>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
              <div className="flex min-h-[150px] flex-col items-center justify-center rounded-xl border border-[#E5E7EB] p-8 text-center md:min-h-[180px] md:p-10">
                <p className="text-gray-500 md:text-lg">
                  Total Tasks
                </p>

                <p className="mt-5 text-3xl font-bold text-[#974FD0] md:text-4xl">
                  {stats.total}
                </p>
              </div>

              <div className="flex min-h-[150px] flex-col items-center justify-center rounded-xl border border-[#E5E7EB] p-8 text-center md:min-h-[180px] md:p-10">
                <p className="text-gray-500 md:text-lg">
                  Completed
                </p>

                <p className="mt-5 text-3xl font-bold text-green-500 md:text-4xl">
                  {stats.completed}
                </p>
              </div>

              <div className="flex min-h-[150px] flex-col items-center justify-center rounded-xl border border-[#E5E7EB] p-8 text-center md:min-h-[180px] md:p-10">
                <p className="text-gray-500 md:text-lg">
                  Pending
                </p>

                <p className="mt-5 text-3xl font-bold text-red-500 md:text-4xl">
                  {stats.pending}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
);
};

export default Profile;