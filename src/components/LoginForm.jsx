import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validateManyFields from '../validations';
import Input from './utils/Input';
import { useDispatch, useSelector } from 'react-redux';
import { postLoginData } from '../redux/actions/authActions';
import Loader from './utils/Loader';
import api from '../api';

const LoginForm = ({ redirectUrl }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '', // Added OTP field
  });
  const [otpRequested, setOtpRequested] = useState(false);
  const navigate = useNavigate();

  const authState = useSelector((state) => state.authReducer);
  const { loading, isLoggedIn } = authState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || '/');
    }
  }, [authState, redirectUrl, isLoggedIn, navigate]);

  const handleSendOtp = async () => {
    try {
      const response = await api.post('/user/send-otp?email='+formData.email);

      if (response.status === 200) {
        console.log('OTP sent successfully');
        setOtpRequested(true); // Show OTP field after successful OTP request
      } else {
        console.error('Failed to send OTP', response);
      }
    } catch (error) {
      console.error('An error occurred while sending OTP:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields('login', formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }
    dispatch(postLoginData(formData.email, formData.password, formData.otp));
  };

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? 'block' : 'hidden'}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  );

  return (
    <>
      <form className='m-auto my-16 max-w-[500px] bg-white p-8 border-2 shadow-md rounded-md'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-center mb-4'>Welcome user, please login here</h2>
            <div className='mb-4'>
              <label htmlFor='email' className='after:content-["*"] after:ml-0.5 after:text-red-500'>
                Email
              </label>
              <Input
                type='text'
                name='email'
                id='email'
                value={formData.email}
                placeholder='youremail@domain.com'
                onChange={handleChange}
              />
              {fieldError('email')}
            </div>

            <div className='mb-4'>
              <label
                htmlFor='password'
                className='after:content-["*"] after:ml-0.5 after:text-red-500'
              >
                Password
              </label>
              <Input
                type='password'
                name='password'
                id='password'
                value={formData.password}
                placeholder='Your password..'
                onChange={handleChange}
              />
              {fieldError('password')}
            </div>

            {otpRequested && ( // Show OTP field when otpRequested is true
              <div className='mb-4'>
                <label
                  htmlFor='otp'
                  className='after:content-["*"] after:ml-0.5 after:text-red-500'
                >
                  OTP
                </label>
                <Input
                  type='text'
                  name='otp'
                  id='otp'
                  value={formData.otp}
                  placeholder='Enter 4-digit OTP'
                  onChange={handleChange}
                  maxLength='4' // Limit input to 4 characters
                />
                {fieldError('otp')}
              </div>
            )}

            <button
              type='button'
              className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark'
              onClick={(e) => {
                e.preventDefault();
                handleSendOtp();
              }}
            >
              Request OTP
            </button>
            <br />
            <button
              className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark'
              onClick={handleSubmit}
            >
              Submit
            </button>

            <div className='pt-4'>
              <Link to='/signup' className='text-blue-400'>
                Don't have an account? Signup here
              </Link>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default LoginForm;
