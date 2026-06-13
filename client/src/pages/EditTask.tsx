import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import Vector from "../assets/Vector.svg";

import {
  getTask,
  updateTask,
} from "../services/taskService";

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [] as string[],
    dueDate: "",
    completed: false,
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(id as string);

        setFormData({
          title: response.data.title,
          description: response.data.description,
          tags: response.data.tags || [],
          dueDate: response.data.dueDate.split("T")[0],
          completed: response.data.completed,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await updateTask(id as string, formData);
      navigate("/tasks");
    } catch (error) {
      console.error(error);
      alert("Failed to update task");
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#faf9fc] md:flex md:flex-col md:gap-20">
      <Navbar />

      <main className="w-full px-4 pt-20 pb-16 min-[390px]:px-5 min-[414px]:px-6 md:px-8 md:pt-32 md:pb-20 md:flex md:flex-col md:items-center md:justify-center">
        <div className="mx-auto flex w-full max-w-[1090px] flex-col items-start gap-12 md:gap-20">
          <div className="flex items-center gap-4">
            <img
              src={Vector}
              alt="Back"
              className="h-6 w-6 cursor-pointer md:h-8 md:w-8"
              onClick={() => navigate("/tasks")}
            />

            <h1 className="text-3xl font-light min-[390px]:text-[34px] min-[414px]:text-4xl md:text-4xl">
              Edit Task
            </h1>
          </div>

          <TaskForm
            title={formData.title}
            description={formData.description}
            dueDate={formData.dueDate}
            tags={formData.tags}
            completed={formData.completed}
            showStatus={true}
            setTags={(tags) =>
              setFormData({
                ...formData,
                tags,
              })
            }
            onTitleChange={(title) =>
              setFormData({
                ...formData,
                title,
              })
            }
            onDescriptionChange={(description) =>
              setFormData({
                ...formData,
                description,
              })
            }
            onDueDateChange={(dueDate) =>
              setFormData({
                ...formData,
                dueDate,
              })
            }
            onCompletedChange={(completed) =>
              setFormData({
                ...formData,
                completed,
              })
            }
            onSubmit={handleSubmit}
            buttonText="Update Task"
          />
        </div>
      </main>
    </section>
  );
};

export default EditTask;