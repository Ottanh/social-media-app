import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../../state';
import { setUser, setToken } from '../../../state';
import './index.css';

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
}
`;


type Inputs = {
  name: string,
  username: string,
  password: string,
  submit: string
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, clearErrors, reset, control, formState: { errors } } = useForm<Inputs>();
  const { isDirty } = useFormState({control});
  const [, dispatch] = useStateValue();


  const [registerMutation, result] = useMutation(REGISTER, {
    onError: (error) => {
      setError('submit', { message: error.graphQLErrors[0].message});
    },
  });


  useEffect(() => {
    clearErrors('submit');
  }, [isDirty]);


  useEffect(() => {
    if(result.data){
      const user = result.data.createUser.user;
      const token = result.data.createUser.token;
      dispatch(setUser(user));
      dispatch(setToken(token));
      localStorage.setItem('sma-user-token', token);
      localStorage.setItem('sma-user', JSON.stringify(user));
      navigate(`/${user.username}`);
    }
  }, [result.data]);

  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    registerMutation({ variables: { name: data.name, username: data.username, password: data.password } });
    reset();
  };

  return (
    <form className="RegisterForm" onSubmit={handleSubmit(onSubmit)}>     
      <input 
        className="field" 
        type="text" 
        placeholder="name" 
        {...register('name', {required: 'Name is required'})} 
      />
      <input 
        className="field" 
        type="text" 
        placeholder="username" 
        {...register('username', {required: 'Username is required'})} 
      />
      {errors.username && <div className="divErr">{errors.username.message}</div>}
      <input 
        className="field" 
        type="password" 
        placeholder="password" 
        {...register('password', {required: 'Password is required'})} 
      />
      {errors.password && <div className="divErr">{errors.password.message}</div>}
      <input 
        className="button" 
        type="submit" 
        value="Register"
      />
      {errors.submit && <div className="divErr">{errors.submit.message}</div>}
    </form>
  );
};

export default RegisterForm;


