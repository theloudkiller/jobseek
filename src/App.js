// App.js
import React, { useEffect, useState } from "react";
import Auth from "./components/auth";
import MainContent from "./components/MainContent";
import { auth } from "./config/firebase";

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
      {user ? <MainContent /> : <Auth />}
    </div>
  );
}

export default App;
