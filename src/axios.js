import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-b-4eec9.cloudfunctions.net/api",
  // "http://localhost:5001/b-4eec9/us-central1/api", //firebase API 云函数 URL
});

export default instance;
