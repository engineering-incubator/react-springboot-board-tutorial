import React from 'react';
import { SignupProvider } from '_/context/signContext';
import SignUp from '_/components/signup/SignUp';

const SignupContainer = () => {
  return (
    <SignupProvider>
      <SignUp />
    </SignupProvider>
  );
};

export default SignupContainer;
