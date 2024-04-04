import React, { useState } from 'react';
import * as Icon from 'react-feather';
import '../assets/styles/TextInput.css'; // Import our css file for the text input comp
import { userTypes } from '../assets/lists/UserTypes'; // Importing list of user type from separate JS file
import AnalysisResult from './AnalysisResult'; // Import AnalysisResult component for use in here

const TextInput = () => {
  const [text, setText] = useState('');
  const [userType, setUserType] = useState('Admin'); // Default the user type to admin on page load
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [results, setResults] = useState([]); // State to store analysis results

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/analyze', { // URL to target the backend Node server
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error('Non success network response');
      }
      const data = await response.json();
      const analysisResult = data.analysis;
      const newResult = { inputText: text, analysisResult };
      setResults([...results, newResult]); //Set results using spread operator
      setText('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type); // If the user selects another type with the dropdown change their type and close dropdown
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => { // Display dropdown options if it is clicked
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="textInputContainer">
      <div className="userTypeDropdown" onClick={toggleDropdown}> 
        <span>{userType}</span>  
        <div className="dropdownIconWrapper">   {/* Using feather icons to display black chevron, down if menu closd to the side if open */}
          {isDropdownOpen ? <Icon.ChevronRight size={20} color="#000" /> : <Icon.ChevronDown size={20} color="#000" />}
        </div>
        {isDropdownOpen && (
          <div className="dropdownContent">
            {userTypes.map((type, index) => (  
              <div key={index} className="dropdownOption" onClick={() => handleUserTypeChange(type)}> 
                {type} {/* If the dropdown is open map out the user types to show them all */}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="greetingText">Hello, Dani</div>
      <div className="checkInText">Just a quick check in</div>
      <div className="analysisResultContainer"> {/* our results will be in here, we want this to be scrollable */}
        {results.map((result, index) => (
          <AnalysisResult key={index} inputText={result.inputText} analysisResult={result.analysisResult} />
        ))} {/* Map out all the results, for each result call the AnalysisResult component and pass in the input and output */}
      </div>
      <div className="textInputWrapper"> {/* Attach hook to send the input if the enter key is pressed */}
        <input 
          type="text"
          value={text}
          onKeyDown={handleKeyPress} 
          onChange={handleChange}
          placeholder="Chat with CynchAI..."
          className="textInput"
        /> {/* Input box with a handleChange hook to set the value entered */}
        <div className="submitButton" data-testid="submitButton" onClick={handleSubmit}>
          <div className="arrowButton"> {/* Nestle this arrow into the input box, and let it act as a submit button */}
            <Icon.ArrowUp size={24} color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
