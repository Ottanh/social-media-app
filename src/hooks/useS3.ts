import { gql, useLazyQuery } from '@apollo/client';
import axios, { AxiosResponse } from 'axios';

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


type Return = [
  (file: File) => Promise<void>, 
  (file: File) => Promise<void>, 
  (ur: string) => Promise<AxiosResponse<any, any> | null>                       // eslint-disable-line @typescript-eslint/no-explicit-any
];

const useS3 = (): Return => {
  const [getSignedPut, ] = useLazyQuery(GET_SIGNED_PUT);
  const [getSignedDelete, ] = useLazyQuery(GET_SIGNED_DELETE);

  const uploadImage = async (image: File) => {
    await getSignedPut({ 
      variables: { 
        fileName: image.name 
      }, 
      onCompleted: async data => {
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
        const res = await axios.delete(data.getDeleteUrl);
        if(res.status !== 204) {
          throw new Error('Error deleting image');
        }  
      }
    });
  };

  const getImage = async (url: string) => {
    try {
      return await axios.get(url);
    } catch {
      console.log('Error fetching image');
      return null;
    }
  };

  return [uploadImage, deleteImage, getImage];
};

export default useS3;