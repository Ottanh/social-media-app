import { gql, useMutation } from '@apollo/client';


const EDIT = gql`
mutation editUser($description: String, $image: String) {
  editUser(description: $description, image: $image) {
    id
    description
    image
  }
}
`;


const useEditUser = () => {
  const [editUser,] = useMutation(EDIT);
  return editUser;
};

export default useEditUser;