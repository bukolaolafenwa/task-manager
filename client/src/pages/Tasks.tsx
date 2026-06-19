import { useEffect, useState } from "react";
import { getTasks, getTaskCount, deleteTask } from "../services/taskService";
import type { Task } from "../types/task";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"
import deleteIcon from "../assets/deleteIcon.svg"
import clarity from "../assets/clarity.svg"

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [loading, setLoading] = useState(true);

  // const [hasCreatedTasks, setHasCreatedTasks] = useState(false);

 const [tags, setTags] = useState("");
const [completed, setCompleted] = useState("");

useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response =
        await getTasks(
          tags,
          completed
        );

      const countResponse =
        await getTaskCount();

      console.log(response);

      setTasks(
        response.data
      );

      setTotalTasks(
        countResponse.count
      );

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, [tags, completed]);

  if (loading) {
  return <h2>Loading...</h2>;
  }



const handleDelete = async (
  id: string
) => {

  const confirmDelete =
    window.confirm(
      "Are you sure you want to delete this task?"
    );

  if (!confirmDelete) {
    return;
  }

  try {

    await deleteTask(id);

    setTasks((prevTasks) =>
      prevTasks.filter(
        (task) => task._id !== id
      )
    );

  } catch (error) {

    console.error(error);

  }
};

return (
  <section className="w-full min-h-screen bg-[#faf9fc] flex flex-col items-center md:gap-20">
    <Navbar />
   
    <main className="w-full px-4 pt-20 pb-16 sm:px-5 md:px-30 md:pt-32 md:pb-20 flex flex-col items-center justify-center">
      <div className="w-full max-w-[1090px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h1 className="text-[34px] md:text-[46px] leading-none font-semibold text-[#2c2c2c]">
              My Tasks
            </h1>

            <Link
              to="/create-task"
              className="flex items-center gap-2 md:gap-3 text-[#974FD0] text-[20px] md:text-[24px] font-semibold hover:underline"
            >
              <span className="text-[28px] md:text-[34px] font-light leading-none">
                +
              </span>
              Add New Task
            </Link>
          </div>

          {/* Filters */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:flex md:justify-end md:gap-5">
            <select
              className="w-full md:w-[170px] border border-[#d5d1d8] rounded-lg px-4 md:px-8 py-3 bg-[#fbfafc] text-[#6f6f6f] text-[16px] md:text-[18px] font-semibold outline-none focus:border-[#974FD0]"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            >
              <option value="">All Tags</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Important">Important</option>
              <option value="Urgent">Urgent</option>
            </select>

            <select
              className="w-full md:w-[190px] border border-[#d5d1d8] rounded-lg px-4 py-3 bg-[#fbfafc] text-[#6f6f6f] text-[16px] md:text-[18px] font-semibold outline-none focus:border-[#974FD0]"
              value={completed}
              onChange={(e) => setCompleted(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="true">Completed</option>
              <option value="false">Pending</option>
            </select>
          </div>
        </div>

     
 {tasks.length === 0 ? (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <h2 className="text-3xl font-semibold text-[#2c2c2c] mb-3">
      {totalTasks === 0
        ? "No Tasks Yet"
        : "No Tasks Found"}
    </h2>

    <p className="text-[#6f6f6f] text-lg mb-8">
      {totalTasks === 0
        ? "Create your first task to get started."
        : "No tasks match the selected filters."}
    </p>

    <Link
      to="/create-task"
      className="
        bg-[#974FD0]
        text-white
        px-8
        py-4
        rounded-md
        w-[180px]
        font-medium
        hover:bg-green-300
        hover:text-purple-500
        transition
      "
    >
      Create New Task
    </Link>
  </div>
) : (


          <section className="flex flex-col gap-10 md:gap-20">
            {tasks.map((task) => (
              <article
                key={task._id}
                className="w-full md:h-60 border border-[#d5d1d8] rounded-sm bg-[#fbfafc] overflow-hidden"
              >
                <div className="flex flex-col gap-5 border-b border-[#dedbe1] px-4 py-5 md:flex-row md:items-center md:justify-between md:px-14 md:py-10 md:h-18">
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {task.tags && task.tags.length > 0 ? (
                      task.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className={`text-[18px] md:text-[23px] font-normal ${
                            tag === "Urgent"
                              ? "text-[#ff7474]"
                              : tag === "Important"
                              ? "text-[#63c6a5]"
                              : tag === "Personal"
                              ? "text-[#974FD0]"
                              : "text-[#4f83ff]"
                          }`}
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-[18px] md:text-[23px] font-normal text-[#63c6a5]">
                        Important
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 md:gap-8">
                    <Link
                      to={`/edit-task/${task._id}`}
                      className="flex items-center justify-center gap-2 bg-[#974FD0] text-white px-5 py-3 md:h-10 md:w-[110px] rounded-sm text-[16px] md:text-[18px] font-bold hover:bg-green-300 hover:text-[#974FD0] transition cursor-pointer"
                    >
                      <img src={clarity} alt="edit" className="w-5 h-5 md:w-6 md:h-5" />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(task._id)}
                      className="flex items-center justify-center gap-2 border border-[#974FD0] text-[#974FD0] px-5 py-3 rounded-sm text-[16px] md:text-[18px] md:[100px] font-bold hover:bg-red-400 hover:text-gray-700 transition cursor-pointer"
                    >
                      <img src={deleteIcon} alt="delete" className="w-5 h-5 md:w-6 md:h-6" />
                      Delete
                    </button>
                  </div>
                </div>

                <div className="px-4 pt-8 pb-10 md:px-14 md:pt-20 md:pb-24">
                  <h2 className="text-[26px] md:text-[33px] leading-tight font-bold mb-3 text-[#252525]">
                    {task.title}
                  </h2>

                  <p className="text-[18px] md:text-[23px] leading-[1.35] font-semibold text-[#6f6f6f]">
                    {task.description}
                  </p>
                </div>
              </article>
            ))}
          </section>
        )}

        <div className="text-center mt-16">
          <a
            href="#top"
            className="text-[#974FD0] underline text-[20px] md:text-[24px] font-semibold"
          >
            Back To Top
          </a>
        </div>
      </div>
    </main>
  </section>
);
};

export default Tasks