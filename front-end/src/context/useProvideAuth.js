import React, { useEffect, useState } from "react";

export function useProvideAuth() {
  const [userInfo, setUserInfo] = useState({});
  const test = (value) => {setUserInfo(value)};

  useEffect(() => {
    console.log(userInfo)
  }, [userInfo]);

  return {userInfo, test}
}