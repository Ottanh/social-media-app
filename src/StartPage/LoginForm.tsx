import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';

import './LoginForm.css';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login (username: $username, password: $password) { 
      value
    }
  }
`;

type Inputs = {
  username: string,
  password: string,
  submit: string
};



const LoginForm = () => {
  const { register, handleSubmit, setError, clearErrors, reset, control, formState: { errors } } = useForm<Inputs>();
  const { isDirty } = useFormState({control});

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError('submit', { message: error.graphQLErrors[0].message});
    },
  });

  useEffect(() => {
    clearErrors('submit');
  }, [isDirty]);


  const onSubmit: SubmitHandler<Inputs> = data => {
    login({ variables: data });
    reset();
  };

  return (
    <Col className="LoginForm col-md-5 d-flex flex-column">
      <Row id="row" className="border rounded p-3 m-auto mt-0 mb-3 w-100" >
        <Col id="FormColumn" className="p-3 pt-5" align="center">
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
        </Col>
      </Row>
    </Col>
  );
};

export default LoginForm;

