import axios from "axios";

interface CreateTaskData {
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
}

const API_URL = "http://localhost:3600/api/tasks";

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
    }
  );

  return response.data;
};

export const getTask = async (id: string) => {
  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return response.data;
};


export const createTask = async (
  taskData: CreateTaskData
) => {
  const response = await axios.post(
    API_URL,
    taskData
  );

  return response.data;
};

export const updateTask = async (
  id: string,
  taskData: any
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    taskData
  );

  return response.data;
};

export const deleteTask = async (
  id: string
) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};