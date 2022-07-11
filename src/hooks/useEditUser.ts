import { ApolloError, gql, useMutation } from '@apollo/client';
import { useState } from 'react';


const EDIT = gql`
mutation editUser($description: String, $image: String) {
  editUser(description: $description, image: $image) {
    id
    description
  }
}
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useEditUser = (): [any, string | undefined] => {
  const [error, setError] = useState<string | undefined>();

  const handleError = (error: ApolloError) => {
    if(error.networkError) {
      setError(error.networkError.message);
    } 
    if (error.graphQLErrors[0]) {
      setError(error.graphQLErrors[0].message);
    }
  };

  const [editDescription,] = useMutation(EDIT, {
    onError: handleError,
  });


  return [editDescription, error];
};


export default useEditUser;