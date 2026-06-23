import { useEffect, useState } from "react";
import {
  getTrashedTasks,
  restoreTask,
} from "../services/taskService";
import Navbar from "../components/Navbar";

const Trash = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] =
    useState(true);

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

     console.log("Restoring:", id);
    try {
        const response =
      await restoreTask(id);

          console.log(response);

      fetchTrash();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Trash
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <p>
            No trashed tasks found.
          </p>
        ) : (
          <div className="space-y-4">

            {tasks.map((task) => (
              <div
                key={task._id}
                className="rounded-lg border p-4"
              >
                <h2 className="text-xl font-semibold">
                  {task.title}
                </h2>

                <p className="mt-2">
                  {task.description}
                </p>

                <button
                  onClick={() =>
                    handleRestore(
                      task._id
                    )
                  }
                  className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  Restore Task
                </button>
              </div>
            ))}

          </div>
        )}
      </main>
    </>
  );
};

export default Trash;