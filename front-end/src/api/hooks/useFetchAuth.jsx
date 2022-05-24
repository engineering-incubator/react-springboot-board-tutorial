import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { isFailureStatus } from '../config/status-code.config'
import { useHistory } from "react-router-dom";
import { whoami } from '../authApi';

export function useFetchAuth() {
  const [whoami, setWhoami] = useState({});
  useEffect(function whoami() {
    (async function getWhoamiData() {
      const data = await whoami();
      console.log(data)
      setWhoami(data)
    })();
  }, []);

  return whoami;
}

