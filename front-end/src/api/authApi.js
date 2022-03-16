import client from "./client";
export const signUp = async({
    email,
    loginId,
    password,
    permission,
    phoneNumber,
}) => {
    try {
        const response = await client.post("/api/v1/authentication/sign-up", {
            email,
            loginId,
            password,
            permission,
            phoneNumber,
        });
        console.log("회원가입 api 호출");
        return true;
    } catch (e) {
        return false;
    }
};