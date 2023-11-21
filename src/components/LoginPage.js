// LoginPage.js
import React from "react";
import { signInWithGoogle } from "../config/firebase"; // Make sure to import your authentication function

const LoginPage = () => {
  return (
    <div>
      <h2>Login Page</h2>
      <p>Please sign in to access the content.</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;
