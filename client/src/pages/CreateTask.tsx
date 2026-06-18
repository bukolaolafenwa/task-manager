import { useState } from "react";
import { createTask } from "../services/taskService";
import { useNavigate, Link } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";
import Vector from "../assets/Vector.svg";

const CreateTask = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [] as string[],
    dueDate: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    tags: "",
    dueDate: "",
  });

  const handleSubmit = async () => {
    console.log("Submit clicked");
    const newErrors = {
      title: "",
      description: "",
      tags: "",
      dueDate: "",
    };

    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = "Please enter a task title";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Please enter a description";
      isValid = false;
    }

    if (formData.tags.length === 0) {
      newErrors.tags = "Please select at least one tag";
      isValid = false;
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Please select a due date";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;


    try {
      // await createTask(formData);

      // navigate("/tasks");

      console.log(formData);

  await createTask(formData);

  console.log("Task created successfully");

  navigate("/tasks");

      setFormData({
        title: "",
        description: "",
        tags: [],
        dueDate: "",
      });
    } catch (error) {
  console.error("Create task error:", error);
}
  };

  return (
    <section className="w-full min-h-screen mx-auto bg-[#faf9fc] md:flex md:flex-col md:gap-20">
      <Navbar />

      <main className="w-full px-4 pt-20 pb-16 min-[390px]:px-5 min-[414px]:px-6 md:px-8 md:pt-32 md:pb-20 md:flex md:flex-col md:items-center md:justify-center">
        <div className="mx-auto flex w-full max-w-[1090px] flex-col items-start gap-12 md:gap-20">
          <div className="flex items-center gap-4">
            <Link to="/tasks">
              <img
                src={Vector}
                alt="Back"
                className="h-6 w-6 md:h-8 md:w-8"
              />
            </Link>

            <h1 className="text-3xl font-light min-[390px]:text-[34px] min-[414px]:text-4xl md:text-4xl">
              New Task
            </h1>
          </div>

          <TaskForm
            title={formData.title}
            description={formData.description}
            dueDate={formData.dueDate}
            tags={formData.tags}
            titlePlaceholder="E.g Project Defense, Assignment..."
            descriptionPlaceholder="Briefly describe your task..."
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
            onSubmit={handleSubmit}
            buttonText="Done"
          />

          {(errors.title ||
            errors.description ||
            errors.tags ||
            errors.dueDate) && (
            <div className="space-y-2 text-sm min-[414px]:text-base">
              {errors.title && (
                <p className="text-red-500">{errors.title}</p>
              )}

              {errors.description && (
                <p className="text-red-500">{errors.description}</p>
              )}

              {errors.tags && (
                <p className="text-red-500">{errors.tags}</p>
              )}

              {errors.dueDate && (
                <p className="text-red-500">{errors.dueDate}</p>
              )}
            </div>
          )}
        </div>
      </main>
    </section>
  );
};

export default CreateTask;