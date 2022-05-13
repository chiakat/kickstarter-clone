import axios from 'axios';

export default axios.create({
  // baseURL: `${process.env.REACT_APP_LOCAL_BASEURL}/api/projects`,
  baseURL: `${process.env.REACT_APP_PROD_BASEURL}/api/projects`,
});
