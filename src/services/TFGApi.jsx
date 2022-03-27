import axios from "axios";

const API = "http://localhost:8080/api";
const TIMEOUT = 5000;

export const checkCredentials = (user, password) => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Content-Type": "application/json",
      Accept: "application/json",
      User: user,
      Password: password
    },
    timeout: TIMEOUT,
  };

  return axios.get(API + "/students/login", config);
};

export const getAllTfgs = () => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: TIMEOUT,
  };

  return axios.get(API + "/tfgs", config);
};

export const getTfgsByStudentId = (studentId) => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: TIMEOUT,
  };
  return axios.get(API + `/tfgs/students/${studentId}`, config);
};