import apiService from '../api/api.service';

class LoginService {
  Login = async (email, password) => {
    try {
      const result = await apiService.post('/api/login/authenticate', { email, password });
      return result;
    } catch (e) {
      return e.response;
    }
  };

  Register = async (email, password, username, preferredLanguage) => {
    try {
      const result = await apiService.post('/api/login/register', {
        email,
        password,
        username,
        preferredLanguage,
      });
      return result;
    } catch (e) {
      return e.response;
    }
  };

  Reset = async (email) => {
    try {
      const result = await apiService.post('/api/login/requestresetmail', { email });
      return result;
    } catch (e) {
      return e.response;
    }
  };

  ResetWithToken = async (token, password) => {
    try {
      const result = await apiService.post('/api/login/passwordreset', { token, password });
      return result;
    } catch (e) {
      return e.response;
    }
  };

  ActivateAccount = async (token) => {
    try {
      const result = await apiService.post('/api/login/activate/', { token });
      return result;
    } catch (e) {
      return e.response;
    }
  };
}

const loginService = new LoginService();
export default loginService;
