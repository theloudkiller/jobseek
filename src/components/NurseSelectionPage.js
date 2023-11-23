// NurseSelectionPage.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const NurseSelectionPage = ({ onSelectNurse }) => {
  const [nurses, setNurses] = useState([]);
  const [selectedNurse, setSelectedNurse] = useState('');

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const nursesCollection = collection(db, 'nurses');
        const nursesSnapshot = await getDocs(nursesCollection);
        const nursesData = nursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNurses(nursesData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchNurses();
  }, []);

  const handleNurseSelect = (nurse) => {
    setSelectedNurse(nurse);
    onSelectNurse(nurse);
  };
   
  return (
    <div>
      <h2>Select your Profession</h2>
      <select
        value={selectedNurse}
        onChange={(e) => handleNurseSelect(e.target.value)}
      >
        <option value="">Select Your Profession</option>
        {nurses.map((nurse) => (
          <option key={nurse.id} value={nurse.id}>
            {nurse.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NurseSelectionPage;
