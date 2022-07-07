import { ApolloError, gql, useMutation } from "@apollo/client";



const EDIT = gql`
mutation editDescription($newDes: String!) {
  editDescription(newDes: $newDes) {
    id
    description
  }
}
`;

const useEditUserDes = () => {

  const handleError = (error: ApolloError) => {
    if(error.networkError) {
      console.log(error.networkError.message);
    } 
    if (error.graphQLErrors[0]) {
      console.log(error.graphQLErrors[0].message);
    }
  };

  const [editDescription,] = useMutation(EDIT, {
    onError: handleError,
  });


  return editDescription;
};


export default useEditUserDes;