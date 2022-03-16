//8 ~ 16자 영문, 숫자 조합
export const isPassword = (asValue) => {
	var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

	return regExp.test(asValue);
};

export const isEmail = (asValue) => {
	var regExp =
		/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

	return regExp.test(asValue);
};

export const isPhoneNumber = (asValue) => {
	var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;

	return regExp.test(asValue);
};
