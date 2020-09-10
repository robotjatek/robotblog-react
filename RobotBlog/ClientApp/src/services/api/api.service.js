import axios from 'axios';

class ApiService {
  _createHeaders = () => {
    const { loginResult } = JSON.parse(localStorage.getItem('@reactn'));
    if (loginResult?.token) {
      const { token } = loginResult;
      return { Authorization: `Bearer ${token}` };
    }

    return {};
  };

  get = (url) => axios.get(url, { headers: this._createHeaders() });

  post = (url, data) => axios.post(url, data, { headers: this._createHeaders() });
}

const apiService = new ApiService();
export default apiService;
