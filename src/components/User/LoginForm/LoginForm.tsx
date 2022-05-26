import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../../state';
import { setUser, setToken } from '../../../state';
import './index.css';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login (username: $username, password: $password) { 
      token
      user {
        id
        username
        name
        joined
        description
      }
    }
  }
`;

type Inputs = {
  username: string,
  password: string,
  submit: string
};


const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, clearErrors, reset, control, formState: { errors } } = useForm<Inputs>();
  const { isDirty } = useFormState({control});

  const [, dispatch] = useStateValue();

  const [loginQuery, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError('submit', { message: error.graphQLErrors[0].message});
    },
  });

  useEffect(() => {
    clearErrors('submit');
  }, [isDirty]);

  useEffect(() => {
    if(result.data){
      dispatch(setUser(result.data.login.user));
      dispatch(setToken(result.data.login.token));
      localStorage.setItem('sma-user-token', result.data.login.token);
      localStorage.setItem('sma-user', JSON.stringify(result.data.login.user));
      navigate(`/${result.data.login.user.username}`);
    }
  }, [result.data]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    loginQuery({ variables: { username: data.username, password: data.password } });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>     
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
        value="Login"
      />
      {errors.submit && <div className="divErr">{errors.submit.message}</div>}
    </form>
  );
};

export default LoginForm;

