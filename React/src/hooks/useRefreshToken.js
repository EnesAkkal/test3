import useAuth from './useAuth.js';
import axios from "axios";

const refreshUrl = '/refresh-token';
const useRefreshToken = () => {
    const { setAuth } = useAuth();

  return async () => {
      const response = await axios.get(refreshUrl, {
        withCredentials: true
      });
      setAuth(prev => {
        console.log(JSON.stringify(prev));
        console.log(response.data.accessToken);
        return {...prev, accessToken: response.data.accessToken}
      });
      return response.data.accessToken;
    };
};

export default useRefreshToken;
