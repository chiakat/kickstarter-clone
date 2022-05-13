import axios from 'axios';

export default axios.create({
  // baseURL: 'http://localhost:3001/api/projects',
  // baseURL: process.env.REACT_APP_LOCAL_URL,
  baseURL: process.env.REACT_APP_PROD_URL,
});
