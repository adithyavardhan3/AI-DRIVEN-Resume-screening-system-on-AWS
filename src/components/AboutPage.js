import React from 'react';
import './AboutPage.css'; // Create this file for custom styles

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>Welcome to the Resume Screening System! We help recruiters find the best candidates efficiently.</p>
      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Automated resume screening using AI.</li>
          <li>Real-time notifications for top candidates.</li>
          <li>Easy-to-use interface for recruiters.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;