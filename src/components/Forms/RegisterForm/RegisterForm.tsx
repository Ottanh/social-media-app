import { useEffect } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import useCreateUser from '../../../hooks/useCreateUser';
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
  const [createUser, createUserError] = useCreateUser();
  
  useEffect(() => {
    setError('submit', { message: createUserError });
  }, [createUserError]);

  useEffect(() => {
    clearErrors('submit');
  }, [isDirty]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createUser({ 
      variables: { 
        name: data.name, 
        username: 
        data.username, 
        password: data.password 
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


