import { gql, useLazyQuery } from '@apollo/client';
import axios from 'axios';

const GET_SIGNED_PUT = gql`
  query getPutUrl($fileName: String!) {
    getPutUrl(fileName: $fileName)
  }
`;

const GET_SIGNED_DELETE = gql`
  query getDeleteUrl($fileName: String!) {
    getDeleteUrl(fileName: $fileName)
  }
`;


const useS3 = () => {
  const [getSignedPut, ] = useLazyQuery(GET_SIGNED_PUT);

  const [getSignedDelete, ] = useLazyQuery(GET_SIGNED_DELETE);

  const uploadImage = async (image: File) => {
    await getSignedPut({ 
      variables: { 
        fileName: image.name 
      }, 
      onCompleted: async data => {
        console.log(data);
        const res = await axios.put(data.getPutUrl, image);
        if(res.status !== 200) {
          throw new Error('Error uploading image');
        }
      }
    });
  };

  const deleteImage = async (image: File) => {
    console.log(image.name);
    await getSignedDelete({ 
      variables: { 
        fileName: image.name 
      }, 
      onCompleted: async data => {
        console.log(data);
        const res = await axios.delete(data.getDeleteUrl);
        if(res.status !== 204) {
          throw new Error('Error deleting image');
        }  
      }
    });
  };

  return [uploadImage, deleteImage];
};

export default useS3;