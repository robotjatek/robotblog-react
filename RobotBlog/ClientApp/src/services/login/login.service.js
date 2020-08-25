import axios from 'axios';

const loginService = {
  Login: async (email, password) => {
    try {
      const result = await axios.post('/api/login/authenticate', { email, password });
      return result.data;
    } catch (e) {
      return null;
    }
  },

  Register: async (email, password) => {
    try {
      const result = await axios.post('/api/login/register', { email, password });
      return result.data;
    } catch (e) {
      return null;
    }
  },
};

export default loginService;
