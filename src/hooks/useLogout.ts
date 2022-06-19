import { useApolloClient } from '@apollo/client';
import { setUser, useStateValue } from '../state';

const useLogout = () => {
  const client = useApolloClient();
  const [, dispatch] = useStateValue();

  const logout = () => {
    dispatch(setUser(null));
    localStorage.clear();  
    client.resetStore();
  };

  return logout;
};

export default useLogout;