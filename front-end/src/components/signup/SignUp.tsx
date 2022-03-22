import React, { useState, useReducer } from 'react';
import styled from '@emotion/styled';
import InputText from '_/components/common/InputText';
import InputRadio from '_/components/common/InputRadio';
import { inputValidation } from '_/utils/validation';
import { ID_VALIDATION, DOMAIN_VALIDATION } from '_/config';
import { EMAIL_DOMAINS, PERMISSION_TYPE, PERMISSION_KIND } from '_/constants';
import { getValidationReg, typeValidation } from '_/utils/validation';
import { signupReducer, signupInitialState } from '_/reduce/signupReducer';
import { signupValidReducer, signupValidInitialState } from '_/reduce/singupValidReducer';
import { SIGNUP_CHANGE, SIGNUP_VALIDATION } from '_/reduce/actions';
import {
  StyledCommonWrap,
  StyledCommonCenter,
  StyledCommonTitle,
  StyledCommonButton,
  StyledCommonSelectWrap,
  StyledCommonSelectBox,
} from '_/styles/common';

const SignUp = () => {
  const [inputState, dispatch] = useReducer(signupReducer, signupInitialState);
  const [inputValidState, dispatchValid] = useReducer(signupValidReducer, signupValidInitialState);
  const [isEmailManual, setIsEmailManual] = useState<boolean>(false);

  const { id, pw, digit, email, domain } = inputState;
  const {
    id: idValid,
    pw: pwValid,
    email: emailValid,
    domain: domainValid,
    digit: digitValid,
    permission: permissionValid,
  } = inputValidState;

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regType = getValidationReg(name as typeValidation) || ID_VALIDATION;
    const isValid: boolean = inputValidation(value, regType);

    dispatch({
      type: SIGNUP_CHANGE,
      payload: {
        name,
        value,
      },
    });

    dispatchValid({
      type: SIGNUP_VALIDATION,
      payload: {
        name,
        value: isValid,
      },
    });
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const isManual = value === '직접입력';

    if (isManual) setIsEmailManual(true);

    const isValid = isManual ? false : inputValidation(value, DOMAIN_VALIDATION);

    dispatch({
      type: SIGNUP_CHANGE,
      payload: {
        name,
        value: isManual ? '' : value,
      },
    });

    dispatchValid({
      type: SIGNUP_VALIDATION,
      payload: {
        name: 'domain',
        value: isValid,
      },
    });
  };

  const onClickEmailDirectCancel = () => {
    setIsEmailManual(false);
  };

  const onChangeRadio = (name: string, value: string) => {
    dispatch({
      type: SIGNUP_CHANGE,
      payload: {
        name,
        value,
      },
    });
    dispatchValid({
      type: SIGNUP_VALIDATION,
      payload: {
        name,
        value: true,
      },
    });
  };

  const isComplete = Object.values(inputState).every((i) => !!i);
  console.log(inputState);
  console.log(isComplete);
  const handleSubmit = () => {
    // const { id: idValue, pw: pwValue } = inputText;
    // if (!idValue) {
    //   alert('id 없어요');
    // }
    // if (!pwValue) {
    //   alert('pw 가 없어요');
    // }
  };

  return (
    <StyledCommonWrap>
      <StyledCommonTitle>회원가입</StyledCommonTitle>
      <StyledSignupWrap>
        <StyledArea>
          <StyledPermission>
            {PERMISSION_KIND.map((i) => (
              <InputRadio
                name="permission"
                text={PERMISSION_TYPE[i]}
                isChecked={inputState.permission === PERMISSION_TYPE[i]}
                onChangeRadio={(e) => onChangeRadio(e.target.name, PERMISSION_TYPE[i])}
                isError={!permissionValid}
                key={i}
              />
            ))}
          </StyledPermission>
          <StyledNotice>셋중 하나를 선택해주세요.</StyledNotice>
        </StyledArea>

        <StyledArea>
          <InputText
            type="text"
            name="id"
            text="아이디"
            placeholder="id를 입력해주세요"
            value={id}
            handleChange={onChangeInput}
          />
          <StyledNotice>아이디는 5자 이상 15자 이하 영문+숫자만 가능합니다.</StyledNotice>
          {/* !idValid && !!id  */}
        </StyledArea>
        <StyledArea>
          <InputText
            type="password"
            name="pw"
            text="비밀번호"
            placeholder="pw를 입력해주세요"
            value={pw}
            handleChange={onChangeInput}
          />
          <StyledNotice>
            패스워드는 최소8자 특수문자, 대문자, 숫자를 각각 최소 1개 포함하여야 합니다.
          </StyledNotice>
          {/* {!pwValid && !!pw && } */}
        </StyledArea>

        <StyledArea>
          <StyledEmailArea>
            <InputText
              type="text"
              name="email"
              text="이메일"
              placeholder="email을 입력해주세요"
              value={email}
              handleChange={onChangeInput}
            />
            <StyledEmailUnit>@</StyledEmailUnit>
            {
              <>
                {isEmailManual ? (
                  <StyledDomainWrap>
                    <InputText
                      type="text"
                      name="domain"
                      placeholder="domain을 입력해주세요"
                      value={domain}
                      handleChange={onChangeInput}
                    />
                    <StyledRevertButton type="button" onClick={onClickEmailDirectCancel} />
                  </StyledDomainWrap>
                ) : (
                  <StyledDomainWrap>
                    <StyledCommonSelectWrap>
                      <StyledCommonSelectBox
                        name="domain"
                        defaultValue={'default'}
                        onChange={onChangeSelect}>
                        <option disabled value="default">
                          선택하세요.
                        </option>
                        <option key={0}>직접입력</option>
                        {EMAIL_DOMAINS.map(({ value }, idx) => (
                          <option key={idx + 1}>{value}</option>
                        ))}
                      </StyledCommonSelectBox>
                    </StyledCommonSelectWrap>
                  </StyledDomainWrap>
                )}
              </>
            }
          </StyledEmailArea>
          <StyledNotice>email 형식에 맞춰주세요</StyledNotice>
        </StyledArea>

        <StyledArea>
          <InputText
            type="text"
            name="digit"
            text="전화번호"
            placeholder="전화번호를 입력해주세요"
            value={digit}
            handleChange={onChangeInput}
          />
          <StyledNotice>{'전화번호는 "-" 제외 숫자만 입력해주세요.'}</StyledNotice>
        </StyledArea>

        <StyledCommonButton isPositive={isComplete} onClick={handleSubmit}>
          회원가입
        </StyledCommonButton>
      </StyledSignupWrap>
    </StyledCommonWrap>
  );
};

const StyledPermission = styled(StyledCommonCenter)`
  justify-content: space-between;
`;

const StyledArea = styled.div`
  margin-bottom: 20px;
`;

const StyledSignupWrap = styled.article`
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;
`;

const StyledNotice = styled.p`
  padding-top: 12px;
  font-size: 12px;
  color: gray;
`;

const StyledEmailArea = styled.div`
  display: flex;
  align-items: center;
`;

const StyledEmailUnit = styled.span`
  padding: 0 4px;
`;

const StyledDomainWrap = styled.div`
  position: relative;
  flex: 1;
`;

const StyledRevertButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0px;
  width: 30px;
  height: 30px;
  transform: translateY(-50%);

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    right: 50%;
    width: 1px;
    height: 12px;
    background-color: black;
    content: '';
  }

  &::before {
    transform: translateY(-50%) rotate(45deg);
  }

  &::after {
    transform: translateY(-50%) rotate(-45deg);
  }
`;

export default SignUp;
