import React, { useState, useEffect } from 'react';
import icon from '../assets/images/cynch-icon.jpeg'; // Import Cynch logo for display as a pfp

const AnalysisResult = ({ inputText, analysisResult }) => {
  const [typedResult, setTypedResult] = useState('');
  const fullResult = "Analysis result for " + inputText + ": " + analysisResult;
  useEffect(() => {
    let i = 0; //We want to simulate a typing effect for the result so we have an effect here to achieve it
    const typingInterval = setInterval(() => {
      if (i < fullResult.length) {
        const nextChar = fullResult.charAt(i); //If there is still text left keep appending it to display it
        setTypedResult((prevTypedResult) => prevTypedResult + nextChar);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // We add a slight delay here to make it appear as though it is typing
    return () => clearInterval(typingInterval);
  }, [analysisResult]);

  return (
    <div className="analysisResult" style={{ height: '60px' }}> {/* Set a fixed height for each result container */}
      <div className="profilePictureWrapper">
        <img src={icon} alt="Profile" className="profilePicture" /> {/* Display the Cynch PFP */}
      </div>
      <div className="resultContent">
        <p>{typedResult}</p>
      </div>
    </div>
  );
};

export default AnalysisResult;
