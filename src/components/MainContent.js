// MainContent.js
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const MainContent = () => {
  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getMovieList();
  }, [moviesCollectionRef]);

  // You can add more functionality or UI elements related to movie data here

  return (
    <div>
      <h2>Main Content</h2>
      <p>Welcome to the main content section. Here are the movies:</p>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h3 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h3>
            <p>Date: {movie.releaseDate}</p>
            {/* Add more movie details as needed */}

            {/* You can add buttons or other UI elements for actions */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
