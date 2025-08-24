'use client';
import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API_SignIn } from '@/api/API_SignIn';

const FormSignIn = () => {
    const formik = useFormik<LoginRequest>({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Email không hợp lệ').required('Bắt buộc nhập'),
            password: Yup.string().min(6, 'Tối thiểu 6 ký tự').required('Bắt buộc nhập'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const data = await API_SignIn(values);

                if (data.token) {
                    window.location.reload();
                }
                
                const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
                localStorage.setItem('token', JSON.stringify({ token: data.token, expiry }));
                localStorage.setItem('email', data.email);

            } catch (err: any) {
                const message = err.response?.data?.message || 'Sai email hoặc mật khẩu';
                if (message.toLowerCase().includes("email")) {
                    setErrors({ email: message });
                } else {
                    setErrors({ password: message });
                }
            } finally {
                setSubmitting(false);
            }
        }

    });

    return (
        <StyledWrapper>
            <div className="card">
                <p className="title">Log In!</p>
                <form onSubmit={formik.handleSubmit}>
                    {/* Email */}
                    <div className="field">
                        <input
                            type="email"
                            // name="email"
                            placeholder="Email"
                            className="input-field"
                            {...formik.getFieldProps('email')}
                        />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                        <p className="error">{formik.errors.email}</p>
                    )}

                    {/* Password */}
                    <div className="field">
                        <input
                            type="password"
                            // name="password"
                            placeholder="Password"
                            className="input-field"
                            {...formik.getFieldProps('password')}
                        />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <p className="error">{formik.errors.password}</p>
                    )}

                    {/* Submit */}
                    <button type="submit" className="btn" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="text-white text-sm">
                        If you don't have an account <a href="/signup" className="text-blue-400">Sign Up</a>
                    </p>
                </form>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .card { width: 380px; padding: 1.9rem 1.2rem; text-align: center; background: #2a2b38; }
  .field { margin-top: 0.5rem; display: flex; align-items: center; gap: 0.5em;
           background-color: #1f2029; border-radius: 4px; padding: 0.5em 1em; }
  .input-field { background: none; border: none; outline: none; width: 100%; color: #d3d3d3; }
  .title { margin-bottom: 1rem; font-size: 1.5em; font-weight: 500; color: #f5f5f5; }
  .btn { cursor: pointer; margin: 1rem; border: none; border-radius: 4px;
         font-weight: bold; font-size: 0.8em; text-transform: uppercase;
         padding: 0.6em 1.2em; background-color: #ffeba7; color: #5e6681;
         box-shadow: 0 8px 24px 0 rgb(255 235 167 / 20%); transition: all 0.3s ease-in-out; }
  .btn:hover { background-color: #5e6681; color: #ffeba7; }
  .error { color: #ff6b6b; font-size: 0.75rem; margin-top: 0.25rem; }
`;

export default FormSignIn;
