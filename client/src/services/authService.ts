import axios from "axios";

const API_URL =
  "http://localhost:3600/api/auth";

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  fullName: string;
  bio: string;
  currentPassword?: string;
  newPassword?: string;
}

export const registerUser = async (
  userData: RegisterData
) => {
  const response =
    await axios.post(
      `${API_URL}/register`,
      userData
    );

  return response.data;
};

export const loginUser = async (
  userData: LoginData
) => {
  const response =
    await axios.post(
      `${API_URL}/login`,
      userData
    );

  return response.data;
};

export const getProfile = async (
  token: string
) => {
  const response =
    await axios.get(
      `${API_URL}/profile`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const updateProfile = async (
  token: string,
  profileData: UpdateProfileData
) => {
  const response =
    await axios.put(
      `${API_URL}/profile`,
      profileData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};