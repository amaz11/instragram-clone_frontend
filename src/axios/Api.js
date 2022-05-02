import axios from "axios";

const apibase = axios.create({
  baseURL: "https://instagram-clone-apis.herokuapp.com/",
  withCredentials: true,
  credentials: "include",
});

export { apibase };
