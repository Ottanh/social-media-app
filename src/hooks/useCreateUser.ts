import { gql, useMutation } from '@apollo/client';

const CREATE_USER = gql`
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

const useCreateUser = () => {
  const [createUser,] = useMutation(CREATE_USER);
  return createUser;
};


export default useCreateUser;