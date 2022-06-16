import { ApolloError } from '@apollo/client';


export const handleApolloError = (error: ApolloError, setError: (msg: string) => void) => {
  if(error.networkError) {
    setError(error.networkError.message);
  } 
  if (error.graphQLErrors[0]) {
    setError(error.graphQLErrors[0].message);
  }
};