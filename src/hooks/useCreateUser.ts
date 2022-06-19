import { ApolloError, gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser, useStateValue } from '../state';

const REGISTER = gql`
mutation CreateUser($username: String!, $password: String!, $name: String!) {
  createUser(username: $username, password: $password, name: $name) {
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
}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCreateUser = (): [any, string | undefined] => {
  const [error, setError] = useState<string | undefined>();
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleError = (error: ApolloError) => {
    if(error.networkError) {
      setError(error.networkError.message);
    } 
    if (error.graphQLErrors[0]) {
      setError(error.graphQLErrors[0].message);
    }
  };

  const [createUser, result] = useMutation(REGISTER, {
    onError: handleError,
  });

  useEffect(() => {
    if(result.data){
      const user = result.data.createUser.user;
      const token = result.data.createUser.token;
      dispatch(setUser(user));
      localStorage.setItem('sma-user-token', token);
      localStorage.setItem('sma-user', JSON.stringify(user));
      navigate(`/${user.username}`);
    }
  }, [result.data]);


  return [createUser, error];

};


export default useCreateUser;