import React from 'react';
import { SignupProvider } from '../../context/signContext';
import SignUp from '../../components/signup/SignUp';

const SignupContainer = () => {
  return (
    <SignupProvider>
      <SignUp />
    </SignupProvider>
  );
};

export default SignupContainer;
