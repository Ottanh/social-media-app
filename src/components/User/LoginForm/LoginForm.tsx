import { useEffect } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import useLogin from '../../../hooks/useLogin';
import '../Form.css';

type Inputs = {
  username: string,
  password: string,
  submit: string
};

const LoginForm = () => {
  const { register, handleSubmit, setError, clearErrors, reset, control, formState: { errors } } = useForm<Inputs>();
  const { isDirty } = useFormState({control});
  const [loginQuery, loginError] = useLogin();

  useEffect(() => {
    clearErrors('submit');
  }, [isDirty]);

  useEffect(() => {
    setError('submit', { message: loginError});
  }, [loginError]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    loginQuery({ variables: { 
      username: data.username, 
      password: data.password 
    }});
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
        value="Login"
      />
    </form>
  );
};

export default LoginForm;

