// MainContent.js
import React, { useState } from 'react';
import NurseSelectionPage from './NurseSelectionPage';
import CountrySelectionPage from './CountrySelectionPage';
import JobsPage from './JobsPage';
import ApplicationPage from './ApplicationPage';

import './MainContent.css'; // Import your CSS file for styling

const MainContent = () => {
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleNurseSelect = (nurse) => {
    setSelectedNurse(nurse);
    setSelectedCountry(null);
    setSelectedJob(null);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedJob(null);
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className="main-content">
      <div className="selectors">
        <NurseSelectionPage onSelectNurse={handleNurseSelect} />
        <CountrySelectionPage
          selectedNurse={selectedNurse}
          onSelectCountry={handleCountrySelect}
        />
        <JobsPage selectedCountry={selectedCountry} onSelectJob={handleJobSelect} />
      </div>

      {selectedJob && (
        <ApplicationPage
          selectedCountry={selectedCountry}
          selectedJob={selectedJob}
          onSelectApplication={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default MainContent;
