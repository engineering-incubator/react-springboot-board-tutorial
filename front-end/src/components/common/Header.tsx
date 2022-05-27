import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { whoamiState } from '../../recoil/signin';
import { colors } from '../../styles/variables';

const Header = () => {
  const { isSignin, username, permission } = useRecoilValue(whoamiState);
  console.log(isSignin);
  const navigate = useNavigate();
  const onClickLogo = () => navigate('/');
  return (
    <StyledHeader>
      <StyledLogo>
        <StyledLogoLink onClick={onClickLogo}>👮🏼‍♀️</StyledLogoLink>
      </StyledLogo>
      <StyledInner>
        <StyledNavLink as={'a'} onClick={() => navigate('/articles')}>
          게시판
        </StyledNavLink>
        {isSignin ? (
          <>
            <StyledNavItem>{username}님 환영합니다.</StyledNavItem>
            <StyledNavLink as={'a'}>sign-out</StyledNavLink>
          </>
        ) : (
          <>
            <StyledNavLink as={'a'} onClick={() => navigate('/signin')}>
              로그인
            </StyledNavLink>
            <StyledNavLink as={'a'} onClick={() => navigate('/signup')}>
              회원가입
            </StyledNavLink>
          </>
        )}
      </StyledInner>
    </StyledHeader>
  );
};

const StyledLogo = styled.h1`
  padding: 0 8px 0 0;
  font-size: 30px;
`;

const StyledLogoLink = styled.a``;

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background-color: rgba(45, 45, 45, 0.7);
  backdrop-filter: blur(5px);
`;

const StyledInner = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledNavItem = styled.span`
  padding: 10px 0;
  margin-right: 8px;
`;

const StyledNavLink = styled(StyledNavItem)``;

export default Header;
