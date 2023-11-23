// CountrySelectionPage.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const CountrySelectionPage = ({ selectedNurse, onSelectCountry }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        if (selectedNurse) {
          const nurseCountriesCollection = collection(
            db,
            `nurses/${selectedNurse}/countries`
          );
          const countriesSnapshot = await getDocs(nurseCountriesCollection);
          const countriesData = countriesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCountries(countriesData);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, [selectedNurse]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    onSelectCountry(country);
  };

  return (
    <div>
      <h2>Select a Country</h2>
      <select
        value={selectedCountry}
        onChange={(e) => handleCountrySelect(e.target.value)}
        disabled={!selectedNurse} // Disable if no nurse selected
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelectionPage;
