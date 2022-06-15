import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken, setUser, useStateValue } from '../state';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login (username: $username, password: $password) { 
      token
      user {
        id
        username
        name
        date
        description
        likes
      }
    }
  }
`;


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useLogin = (): [any, string | undefined] => {
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();
  const [loginError, setLoginError] = useState<string | undefined>();
  const [loginQuery, result] = useMutation(LOGIN, {
    onError: (error) => {
      setLoginError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if(result.data){
      dispatch(setUser(result.data.login.user));
      dispatch(setToken(result.data.login.token));
      localStorage.setItem('sma-user-token', result.data.login.token);
      localStorage.setItem('sma-user', JSON.stringify(result.data.login.user));
      navigate(`/${result.data.login.user.username}`);
    }
  }, [result.data]);

  return [loginQuery, loginError];
};

export default useLogin;