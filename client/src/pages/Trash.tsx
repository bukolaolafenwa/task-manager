import { useEffect, useState } from "react";
import {
  getTrashedTasks,
  restoreTask,
} from "../services/taskService";
import Navbar from "../components/Navbar";
import type { Task } from "../types/task";

const Trash = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] =
    useState(true);

  const [restoringId, setRestoringId] =
  useState<string | null>(null);

  const fetchTrash = async () => {
    try {
      const response =
        await getTrashedTasks();

      setTasks(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestore = async (
    id: string
  ) => {

    try {
      setRestoringId(id);
      await restoreTask(id);

      fetchTrash();
    } catch (error) {
      console.error(error);
    } finally {
      setRestoringId(null);
    }
  };

 return (
  <section className="min-h-screen bg-[#FAF9FC]">
    <Navbar />

    <main className="w-full py-16 md:py-24 flex flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-8 md:gap-24 lg:px-10">
        <h1 className="text-start text-[20px] md:text-[46px] leading-none font-semibold text-[#292929]">
          Trash
        </h1>

        {loading ? (
          <p className="text-center text-lg text-gray-500">
            Loading...
          </p>
        ) : tasks.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-lg text-gray-500">
              No trashed tasks found.
            </p>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-6 md:gap-8">
            {tasks.map((task) => (
              <article
                key={task._id}
                className="flex w-full flex-col gap-6 rounded-sm border border-gray-300 bg-white p-6 shadow-sm sm:p-8 md:min-h-[250px] md:gap-10 md:p-12"
              >
                <h2 className="text-2xl font-semibold text-[#292929] md:text-3xl">
                  {task.title}
                </h2>

                <p className="mt-4 text-base leading-relaxed text-gray-500 md:text-xl">
                  {task.description}
                </p>

               
<div className="mt-8">
  <button
    type="button"
    onClick={() =>
      handleRestore(task._id)
    }
    disabled={
      restoringId === task._id
    }
    className={`
      rounded-md
      px-6
      py-3
      md:px-8
      md:py-4
      md:text-lg
      font-semibold
      transition
      cursor-pointer
      ${
        restoringId === task._id
          ? "cursor-not-allowed bg-green-500 opacity-60 text-white"
          : "bg-green-500 text-white hover:bg-purple-500 hover:-translate-y-1 md:hover:scale-105"
      }
    `}
  >
    {restoringId === task._id
      ? "Restoring..."
      : "Restore Task"}
  </button>
</div>

              </article>
            ))}
          </div>
        )}

  {/* BACK TO TOP */}
      <div className="text-center">
        <a
          href="#top"
          className="text-[#974FD0] underline text-base md:text-lg"
        >
          Back To Top
        </a>
      </div>

      </div>
    </main>
  </section>
);
};

export default Trash;