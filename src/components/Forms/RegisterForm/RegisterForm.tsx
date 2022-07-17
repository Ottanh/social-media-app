import { ApolloError } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useCreateUser from '../../../hooks/useCreateUser';
import { setUser, useStateValue } from '../../../state';
import { User } from '../../../types';
import './RegisterForm.css';


type Inputs = {
  name: string,
  username: string,
  password: string,
  submit: string
};

const RegisterForm = () => {
  const { register, handleSubmit, setError, clearErrors, reset, control, formState: { errors } } = useForm<Inputs>();
  const { isDirty } = useFormState({control});
  const createUser = useCreateUser();
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();
  
  useEffect(() => {
    clearErrors('submit');
  }, [isDirty]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createUser({ 
      variables: { 
        name: data.name, 
        username: data.username, 
        password: data.password 
      },
      onCompleted: (data: { createUser: { user: User; token: string; }; }) => {
        dispatch(setUser(data.createUser.user));
        localStorage.setItem('sma-user-token', data.createUser.token);
        localStorage.setItem('sma-user', JSON.stringify(data.createUser.user));
        navigate(`/${data.createUser.user.username}`);
      },
      onError: (e: ApolloError) => {
        setError('submit', { message: e.message });
      }
    });
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
      <div className="divErr">{errors.name && errors.name.message}</div>
      <input 
        className="field" 
        type="text" 
        placeholder="username" 
        {...register('username', {required: 'Username is required'})} 
      />
      <div className="divErr">{errors.username && errors.username.message}</div>
      <input 
        className="field" 
        type="password" 
        placeholder="password" 
        {...register('password', {required: 'Password is required'})} 
      />
      <div className="divErr">
        {errors.password && errors.password.message}
        {errors.submit && errors.submit.message}
      </div>
      <input 
        className="button" 
        type="submit" 
        value="Register"
      />
    </form>
  );
};

export default RegisterForm;


