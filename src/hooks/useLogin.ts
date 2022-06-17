import { ApolloError, gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setHeaderToken } from '..';
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
  const [error, setError] = useState<string | undefined>();
  
  const handleError = (error: ApolloError) => {
    if(error.networkError) {
      setError(error.networkError.message);
    } 
    if (error.graphQLErrors[0]) {
      setError(error.graphQLErrors[0].message);
    }
  };

  const [login, result] = useMutation(LOGIN, {
    onError: handleError,
  });
  
  useEffect(() => {
    if(result.data){
      dispatch(setUser(result.data.login.user));
      dispatch(setToken(result.data.login.token));
      setHeaderToken(result.data.login.token);
      localStorage.setItem('sma-user-token', result.data.login.token);
      localStorage.setItem('sma-user', JSON.stringify(result.data.login.user));
      navigate(`/${result.data.login.user.username}`);
    }
  }, [result.data]);

  return [login, error];
};

export default useLogin;