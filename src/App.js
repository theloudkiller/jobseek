// App.js
import React, { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db, auth } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import LoginPage from "./components/LoginPage";
import MainContent from "./components/MainContent";

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

      {user ? (
        // If user is signed in, show main content
        <MainContent />
      ) : (
        // If user is not signed in, show login page
        <LoginPage />
      )}
    </div>
  );
}

export default App;
