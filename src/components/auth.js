// Auth.js
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import styled from "styled-components";

const AuthContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AuthHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const AuthButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      // Handle the error (if any) when using pop-up
      console.error(err.message);

      // If an error occurs, fallback to redirect-based sign-in
      auth.signInWithRedirect(googleProvider);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleRedirectSignIn = async () => {
    try {
      await getRedirectResult(auth);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    handleRedirectSignIn();
  }, []);

  return (
    <AuthContainer>
      {auth.currentUser ? null : (
        <div>
          <AuthHeader>Login Page</AuthHeader>
          <AuthButton onClick={signInWithGoogle}>Sign In With Google</AuthButton>
        </div>
      )}

      {auth.currentUser && (
        <div>
          <AuthButton onClick={logout}>Logout</AuthButton>
        </div>
      )}
    </AuthContainer>
  );
};

export default Auth;
