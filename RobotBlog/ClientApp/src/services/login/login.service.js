import axios from 'axios';

const loginService = {
  Login: async (email, password) => {
    try {
      const result = await axios.post('/api/login/authenticate', { email, password });
      return result;
    } catch (e) {
      return e.response;
    }
  },

  Register: async (email, password, username, preferredLanguage) => {
    try {
      const result = await axios.post('/api/login/register', {
        email,
        password,
        username,
        preferredLanguage,
      });
      return result;
    } catch (e) {
      return e.response;
    }
  },

  Reset: async (email) => {
    const result = await axios.post('/api/login/requestresetmail', { email });
    return result;
  },

  ResetWithToken: async (token, password) => {
    const result = await axios.post('/api/login/passwordreset', { token, password });
    return result;
  },
};

export default loginService;
