import React from 'react';
import { SignupProvider } from '_/context/SignContext';
import SignUp from 'src/components/signup/SignUp';

const SignupContainer = () => {
  return (
    <SignupProvider>
      <SignUp />
    </SignupProvider>
  );
};

export default SignupContainer;
