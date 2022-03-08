import axios from "axios";

const BASE_URL = "https://mern-atn.herokuapp.com/api/";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

const TOKEN  = localStorage.getItem("persist:root") ? 
                  (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser ? 
                        JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken : "") : ""

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { 
    token: `Bearer ${TOKEN}`,
    Authorization: `Bearer ${process.env.REACT_APP_STRIPE}`
 },
});