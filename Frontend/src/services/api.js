import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const request = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);

    if (res.status === 401) {
      localStorage.clear();
      toast.error("Session expired. Please login again.");
      
      // Delay redirect slightly so the user sees the toast
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
      
      throw new Error("Session expired. Please login again.");
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Request failed");
    }

    return await res.json();
  } catch (error) {
    console.error(`API Error on ${url}:`, error);
    throw error;
  }
};

export const loginUser = async (data) => {
  return request(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const registerUser = async (data) => {
  return request(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getMyComplaints = async () => {
  return request(`${BASE_URL}/complaints/my`, {
    headers: getAuthHeaders(),
  });
};

export const createComplaint = async (formData) => {
  return request(`${BASE_URL}/complaints/add`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(formData),
  });
};

export const getAllComplaints = async () => {
  return request(`${BASE_URL}/complaints`, {
    headers: getAuthHeaders(),
  });
};

export const getStaffUsers = async () => {
  return request(`${BASE_URL}/auth/staff`, {
    headers: getAuthHeaders(),
  });
};

export const assignComplaint = async (id, staffId) => {
  return request(`${BASE_URL}/complaints/assign/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ staffId }),
  });
};

export const updateComplaintStatus = async (id, { status, message }) => {
  return request(`${BASE_URL}/complaints/status/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status, message }),
  });
};

export const getAssignedComplaints = async () => {
  return request(`${BASE_URL}/complaints/assigned`, {
    headers: getAuthHeaders(),
  });
};