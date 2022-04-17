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
    method: "post",
    url: BASE_PATH + `/api/tfgs`,
    headers: {
      "Access-Control-Allow-Origin": BASE_PATH,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: tfgDetails,
    timeout: TIMEOUT,
  };

  return axios(config);
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

export const acceptTfgRequest = (tfgId) => {
  const config = {
    method: "put",
    url: BASE_PATH + `/api/tfgs/${tfgId}/accept`,
    headers: {
      "Access-Control-Allow-Origin": BASE_PATH,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: TIMEOUT,
  };

  return axios(config);
};

export const rejectTfgRequest = (tfgId) => {
  const config = {
    method: "put",
    url: BASE_PATH + `/api/tfgs/${tfgId}/reject`,
    headers: {
      "Access-Control-Allow-Origin": BASE_PATH,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: TIMEOUT,
  };

  return axios(config);
};

export const requestTfgRead = (tfgId) => {
  const config = {
    method: "put",
    url: BASE_PATH + `/api/tfgs/${tfgId}/readRequest`,
    headers: {
      "Access-Control-Allow-Origin": BASE_PATH,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: TIMEOUT,
  };

  return axios(config);
};

export const acceptTfgRead = (tfgId) => {
  const config = {
    method: "put",
    url: BASE_PATH + `/api/tfgs/${tfgId}/acceptRead`,
    headers: {
      "Access-Control-Allow-Origin": BASE_PATH,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: TIMEOUT,
  };

  return axios(config);
};

export const rejectTfgRead = (tfgId) => {
  const config = {
    method: "put",
    url: BASE_PATH + `/api/tfgs/${tfgId}/rejectRead`,
    headers: {
      "Access-Control-Allow-Origin": BASE_PATH,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: TIMEOUT,
  };

  return axios(config);
};
