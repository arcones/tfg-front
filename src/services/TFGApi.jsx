import axios from 'axios';

const API = 'http://localhost:8080/api'
const TIMEOUT = 5000

export const getAllTfgs = () => {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      timeout: TIMEOUT,
    };
  
    return axios.get(API + '/tfgs', config);
  };