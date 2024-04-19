import axios from "axios";

export const payload = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    post: {
      "Content-Type": "application/json",
    },
    patch: {
      "Content-Type": "application/json",
    },
  },
  withCredentials: true,
});
