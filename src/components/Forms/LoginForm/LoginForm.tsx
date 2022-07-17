import { ApolloError } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../../hooks/useLogin';
import { setUser, useStateValue } from '../../../state';
import { User } from '../../../types';
import './LoginForm.css';


type Inputs = {
  username: string,
  password: string,
  submit: string
};

const LoginForm = () => {
  const { register, handleSubmit, setError, clearErrors, reset, control, formState: { errors } } = useForm<Inputs>();
  const { isDirty } = useFormState({control});
  const loginQuery = useLogin();
  const [, dispatch] =useStateValue();
  const navigate = useNavigate();

  useEffect(() => {
    clearErrors('submit');
  }, [isDirty]);


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await loginQuery({ 
      variables: { 
        username: data.username, 
        password: data.password 
      },
      onCompleted: (data: { login: { user: User | null; token: string; }; }) => {
        dispatch(setUser(data.login.user));
        localStorage.setItem('sma-user-token', data.login.token);
        localStorage.setItem('sma-user', JSON.stringify(data.login.user));
        navigate(`/${data.login.user?.username}`);
      },
      onError: (e: ApolloError) => {
        setError('submit', { message: e.message});
      }
    });
    reset();
  };

  return (
    <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>     
      <input 
        className="field" 
        type="text" 
        placeholder="username" 
        {...register('username', {required: 'Username is required'})} 
      />
      <div className="divErr">
        {errors.username && errors.username.message}
      </div>
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
        value="Log in"
      />
    </form>
  );
};

export default LoginForm;

