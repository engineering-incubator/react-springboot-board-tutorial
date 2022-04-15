import React from 'react';
import { SignupProvider } from '../context/signupContext';
import SignUp from '../components/signup/Signup';

const SignupContainer = () => {
  return (
    <SignupProvider>
      <SignUp />
    </SignupProvider>
  );
};

export default SignupContainer;
