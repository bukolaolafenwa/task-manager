import axios from "axios";

interface CreateTaskData {
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
}

const API_URL = `${import.meta.env.VITE_API_URL}/api/tasks`;

const getAuthConfig = () => {
  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };
};

export const getTasks = async (
  tags?: string,
  completed?: string
) => {

  const response = await axios.get(
    API_URL,
    {
      params: {
        tags,
        completed,
      },
       ...getAuthConfig(),
    }
  );

  return response.data;
};

export const getTaskCount =
  async () => {
    const response =
      await axios.get(
        `${API_URL}/count`,
        getAuthConfig()
      );

    return response.data;
  };

export const getTask = async (id: string) => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    getAuthConfig()
  );

  return response.data;
};


export const createTask = async (
  taskData: CreateTaskData
) => {
  const response = await axios.post(
    API_URL,
    taskData,
    getAuthConfig()
  );

  return response.data;
};

export const updateTask = async (
  id: string,
  taskData: any
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    taskData,
    getAuthConfig()
  );

  return response.data;
};

export const deleteTask = async (
  id: string
) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthConfig()
  );

  return response.data;
};

export const getTrashedTasks =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/trash`,
        getAuthConfig()
      );

    return response.data;
};

export const restoreTask =
  async (id: string) => {

    const response =
      await axios.put(
        `${API_URL}/restore/${id}`,
        {},
        getAuthConfig()
      );

    return response.data;
};