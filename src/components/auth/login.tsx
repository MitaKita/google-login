'use client';
import React from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { setLoggedIn } from "@/store/slices/authSlice";
import { prepareLogin } from "@/api/api";

const Login = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const dispatch = useDispatch();

  const onSuccess = (credentialResponse: CredentialResponse) => {
    dispatch(setLoggedIn(true));
    prepareLogin(credentialResponse.credential)
          .then((resp) => console.log('response', resp))
          .catch((err) => console.error(err));
  }

  const onError = () => {
    console.error("Login Failed:");
  }

  return (
    <div>
      {!isLoggedIn && (
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          useOneTap
        />
      )}
      {isLoggedIn && <p>You are logged in!</p>}
    </div>
  );
};

export default Login;