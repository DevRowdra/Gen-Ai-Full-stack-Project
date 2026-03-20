import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  // console.log(username, email, password);
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

/**
 * login function
 */
export async function login({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    console.log(response.data, "form auth.js");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
/**
 * logout function
 */
export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

//* get me function

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
