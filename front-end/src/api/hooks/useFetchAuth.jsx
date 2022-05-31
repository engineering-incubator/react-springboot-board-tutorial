import React, { useEffect, useState } from 'react';
import { whoami } from '../authApi';

export function useFetchAuth() {
  const [userInfo, setUserInfo] = useState({});
  useEffect(function whoamiFunc() {
    (async function getWhoamiData() {
      const data = await whoami();
      console.log(data)
      setUserInfo(data)
    })();
  }, []);
  return userInfo;
}

