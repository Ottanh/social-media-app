import { gql, useMutation } from '@apollo/client';

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


const useLogin = () => {
  const [login,] = useMutation(LOGIN);
  return login;
};

export default useLogin;
