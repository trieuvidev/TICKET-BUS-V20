import api from "./Api";


const setTokenHeaders = (token) => { 
  if (token) {
    api.defaults.headers.common['token'] = token;
  } else {
    delete api.defaults.headers.common['token']
  }
};

export default setTokenHeaders;