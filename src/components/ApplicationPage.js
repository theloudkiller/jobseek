// ApplicationPage.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const ApplicationPage = ({ selectedCountry, selectedJob, onSelectApplication }) => {
  const [userEmail, setUserEmail] = useState('');

  const handleApply = async () => {
    try {
      // Validate email (you can add more robust validation)
      if (!userEmail || !userEmail.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      // Create a new application in the "appointments" subcollection
      const appointmentsCollection = collection(
        db,
        `nurses/${selectedCountry}/countries/${selectedCountry}/jobs/${selectedJob.id}/appointments`
      );

      const newAppointment = {
        jobTitle: selectedJob.jobTitle,
        timestamp: new Date(),
        userEmail: userEmail,
        // Add other application details as needed
      };

      const docRef = await addDoc(appointmentsCollection, newAppointment);
      console.log('Appointment created with ID: ', docRef.id);

      // Call the onSelectApplication callback to handle further actions
      onSelectApplication();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <div>
      <h2>Application Details</h2>
      <p>Job Title: {selectedJob.jobTitle}</p>
      {/* Include other details of the job */}
      <label>Email:</label>
      <input
        type="email"
        placeholder="Enter your email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      {/* Include other input fields for additional details if needed */}
      <button onClick={handleApply}>Submit Application</button>
    </div>
  );
};

export default ApplicationPage;
