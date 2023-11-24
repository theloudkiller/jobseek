// App.js
import React, { useEffect, useState } from "react";
import Auth from "./components/auth";

import {useAuthState} from 'react-firebase-hooks/auth'; 

import MainContent from "./components/MainContent";
import { auth } from "./config/firebase";
import { GoogleLogin } from '@react-oauth/google';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <Auth />
      {user && <MainContent />}
    </div>
  );
}

export default App;
