import React from "react";
import ReduxProvider from "@/store/ReduxProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const ProviderBase = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}>
        {children}
      </GoogleOAuthProvider>
    </ReduxProvider>
  );
};
