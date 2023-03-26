import axios from 'axios';

const HttpClientInstance = axios.create({
  baseURL: 'https://3360-179-177-212-91.sa.ngrok.io/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default HttpClientInstance;
