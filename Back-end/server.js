const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS module
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS

app.use(bodyParser.json());

app.post('/analyze', (req, res) => {
  const { text } = req.body;
  const mockAnalysis = getMockAnalysis(text);
  storeAnalysisInFile(text, mockAnalysis);
  res.json({ analysis: mockAnalysis });
});

function getMockAnalysis(text) {
  const randomNumber = Math.random();
  let analysisResult;

  if (randomNumber <= 0.33) {
    analysisResult = 'negative';
  } else if (randomNumber <= 0.66) {
    analysisResult = 'neutral';
  } else {
    analysisResult = 'positive';
  }
  const result = "Sentiment of text determined to be " + analysisResult;
  return result;
}

function storeAnalysisInFile(text, mockAnalysis){
  const analysisData = { inputText: text, analysisResult: mockAnalysis };
  const dataFilePath = path.join(__dirname, 'analysisData.json');

  fs.appendFile(dataFilePath, JSON.stringify(analysisData) + '\n', (err) => {
    if (err) {
      console.error('Error writing analysis data to file:', err);
    } else {
      console.log('Analysis data stored successfully');
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
