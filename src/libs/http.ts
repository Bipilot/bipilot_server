import axios, { AxiosRequestConfig } from 'axios';

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'; // and so on for other methods

export default class Http {
  public send = async (method: Methods, url: string, access_token: string, fields?: any, payload?: any) => {
    const config: AxiosRequestConfig = {
      method: method,
      url: url,
      params: {
        access_token: access_token
      }
    };

    // Conditionally add fields if it is not null or undefined
    if (fields) {
      config.params.fields = fields;
    }

    // Conditionally add payload to the data property if it is not null or undefined
    if (payload) {
      config.data = payload;
    }
    // Conditionally add headers to the data property if it is not null or undefined
    if (payload) {
      config.headers = { 'Content-Type': 'application/json' }
    }

    try {
      const resp = await axios(config);
      return resp;
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        return error.message;
      }
    }
  }
} 