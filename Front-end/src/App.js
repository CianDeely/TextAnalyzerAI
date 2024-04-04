import React, { useState } from 'react';
import TextInput from './components/TextInput';
import AnalysisResult from './components/AnalysisResult';

const App = () => {
  const [analysisResult, setAnalysisResult] = useState('');

  const handleTextSubmit = (text) => {
    fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAnalysisResult(data.result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <TextInput onSubmit={handleTextSubmit} />
      {analysisResult && <AnalysisResult result={analysisResult} />}
    </div>
  );
};

export default App;