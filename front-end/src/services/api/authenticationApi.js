import requester1 from "../../configures/requestConfigures";

export const signInApi = (data) =>
  requester1("/v1/authentication/sign-in", "POST", data);

export const whoAmIApi = () => requester1("/v1/authentication/whoami");
