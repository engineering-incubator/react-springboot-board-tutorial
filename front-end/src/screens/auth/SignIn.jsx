import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signInApi } from '../../api/authApi';
import { useFetchAuth } from '../../api/hooks/useFetchAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Template from '../../components/common/Template';

const SignIn = () => {
  const history = useHistory();
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const whoami = useFetchAuth();

  const signUpHandler = async () => {
    const response = await signInApi({
      username: id,
      password,
    });
    if (!response.isSuccess) {
      return alert(response.message);
    }
    alert('로그인이 성공했습니다.');
    history.push('/');
  };

  return (
    <>
      <Template title="로그인">
        {whoami.code === 'FAILURE' ? (
          <>
            <Input
              placeholder="아이디"
              name="id"
              onChange={(e) => setId(e.target.value)}
            />
            <Input
              placeholder="비밀번호"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signUpHandler}>로그인</Button>
          </>
        ) : (
          <>
              <h2 style={{ fontSize: 80, lineHeight: 0 }}>안녕하세요</h2>
              <h1 style={{ fontSize: 80 }}>{whoami.content?.username}님!</h1>
              <span
                style={{
                  backgroundColor: '#000',
                  color: '#fff',
                  textAlign: 'center',
                  borderRadius: 30,
                  padding: 5,
                }}
              >
                권한:{whoami.content?.permissions[0]}
              </span>
          </>
        )}
      </Template>
    </>
  );
};
export default SignIn;
