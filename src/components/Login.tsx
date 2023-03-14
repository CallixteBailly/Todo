import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import api from '../api';
import { loginUser } from './AuthenticationServices';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
});


const Login: React.FC = () => {
  const handleSubmit = async (email: string, password: string) => {
    try {
      await loginUser(email, password);
    } catch (error) {
    }
  }
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
  }, []);
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          handleSubmit(values.email, values.password);
          history.push("/");
          resetForm();
        } catch (error) {
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
