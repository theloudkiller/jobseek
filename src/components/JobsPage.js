// JobDetailsPage.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import ApplicationPage from './ApplicationPage'; // Import the ApplicationPage component

const JobsPage = ({ selectedCountry }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [showApplicationPage, setShowApplicationPage] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (selectedCountry) {
          const countryJobsCollection = collection(
            db,
            `nurses/${selectedCountry}/countries/${selectedCountry}/jobs`
          );
          const jobsSnapshot = await getDocs(countryJobsCollection);
          const jobsData = jobsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setJobs(jobsData);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [selectedCountry]);

  const handleJobSelect = async (job) => {
    try {
      setSelectedJob(job);

      // Create a new appointment in the "appointments" subcollection
      const appointmentsCollection = collection(
        db,
        `nurses/${selectedCountry}/countries/${selectedCountry}/jobs/${job.id}/appointments`
      );

      const newAppointment = {
        jobTitle: job.jobTitle,
        timestamp: new Date(),
      };

      const docRef = await addDoc(appointmentsCollection, newAppointment);
      console.log('Appointment created with ID: ', docRef.id);

      // Now, you can navigate or show the details of the appointment as needed
      setShowApplicationPage(true);
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <>
      {showApplicationPage ? (
        // Render the ApplicationPage component when showApplicationPage is true
        <ApplicationPage
          selectedCountry={selectedCountry}
          selectedJob={selectedJob}
          // Pass a callback to handle when the application is submitted
          onSelectApplication={() => setShowApplicationPage(false)}
        />
      ) : (
        <>
          <h2>Jobs in {selectedCountry}</h2>
          {jobs.length > 0 ? (
            <div className="jobs-container">
              {jobs.map((job) => (
                <div className="job-card" key={job.id}>
                  <h3>{job.jobTitle}</h3>
                  <p>Salary: {job.salary}</p>
                  <p>Employer Name: {job.employerName}</p>
                  <button
                    className="apply-button"
                    onClick={() => handleJobSelect(job)}
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No jobs found for this country.</p>
          )}
        </>
      )}
    </>
  );
};

export default JobsPage;
