'use client';

import React from 'react';
import Swal from 'sweetalert2';
import '@/styles/login.scss';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { API_Signin } from '@/api/API_Login';

interface SigninProps {
  onLogin: () => void;
}

const Signin: React.FC<SigninProps> = ({ onLogin }) => {
  const router = useRouter();

  const onSubmit = async (
    values: { username: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const res = await API_Signin(values.username, values.password);

      if (res.token) {
        Cookies.set('token', res.token, { expires: 7 }); // lưu token 7 ngày
        onLogin();

        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công',
          text: 'Welcome back!',
          timer: 1500,
          showConfirmButton: false,
        });

        router.push('/dashboard/managerHome');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại',
          text: 'Tài khoản hoặc mật khẩu sai',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại',
        text: 'Tài khoản hoặc mật khẩu sai!',
      });
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="formSignin">
      <div className="login-box">
        <p>Login Admin</p>
        <Formik initialValues={{ username: '', password: '' }} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="user-box">
                <Field type="text" name="username" required />
                <label>Account</label>
              </div>
              <div className="user-box">
                <Field type="password" name="password" required />
                <label>Password</label>
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                <span />
                <span />
                <span />
                <span />
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Signin;
