import axios from "axios";

const BASE_PATH = "http://localhost:8080";
const TIMEOUT = 5000;

export const checkCredentials = (user, password) => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": BASE_PATH,
      "Content-Type": "application/json",
      Accept: "application/json",
      Mail: user,
      Password: password,
    },
    timeout: TIMEOUT,
  };

  return axios.get(BASE_PATH + "/api/users/login", config);
};

export const getTfgsByStudentId = (studentId) => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": BASE_PATH,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: TIMEOUT,
  };
  return axios.get(BASE_PATH + `/api/tfgs/students/${studentId}`, config);
};

export const getUserInfo = (id) => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": BASE_PATH,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: TIMEOUT,
  };
  return axios.get(BASE_PATH + `/api/users/${id}`, config);
};

export const getDirectorsList = () => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": BASE_PATH,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: TIMEOUT,
  };
  return axios.get(BASE_PATH + `/api/users?role=Director`, config);
};

export const createTfgRequest = (tfgDetails) => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": BASE_PATH,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: tfgDetails, //TODO no rula
    timeout: TIMEOUT,
  };
  console.log(`EL BODY QUE MANDO ES ${JSON.stringify(config.data)}`);
  return axios.post(BASE_PATH + `/api/tfgs`, config);
};

export const getTfgsByDirectorId = (directorId) => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": BASE_PATH,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: TIMEOUT,
  };
  return axios.get(BASE_PATH + `/api/tfgs/director/${directorId}`, config);
};
