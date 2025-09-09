'use client';
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { setLoggedIn } from "@/store/slices/authSlice";

const Login = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const dispatch = useDispatch();

  return (
    <div>
      {!isLoggedIn && (
        <GoogleLogin
          onSuccess={credentialResponse => {
            // You can send credentialResponse.credential to your backend for verification
            console.log("Login Success", credentialResponse);
            dispatch(setLoggedIn(true));
          }}
          onError={() => {
            console.error("Login Failed");
          }}
          useOneTap
        />
      )}
      {isLoggedIn && <p>You are logged in!</p>}
    </div>
  );
};

export default Login;