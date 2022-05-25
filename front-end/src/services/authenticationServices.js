import { signInApi, whoAmIApi } from "./api/authenticationApi";

export async function signInService(data) {
  const signInResponse = await signInApi(data);
  if (!signInResponse.isSuccess) {
    return signInResponse;
  }
  const whoAmIResponse = await whoAmIApi();
  if (!whoAmIResponse.isSuccess) {
    return signInResponse;
  }

  return {
    isSuccess: true,
    data: whoAmIResponse.data,
  };
}
