'use client';

import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '@/styles/login.scss';
import { Formik, Form, Field } from 'formik';
// import API_Signin from '../api/signin';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

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
      const res = await axios.post("API_SignIn", {
        username: values.username,
        password: values.password,
      });

      if (res.data.token) {
        // ✅ lưu token vào cookies (7 ngày)
        Cookies.set('token', res.data.token, { expires: 7 });

        onLogin();

        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công',
          text: 'Welcome back!',
          timer: 1500,
          showConfirmButton: false,
        });

        // ✅ chuyển trang bằng useRouter
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
