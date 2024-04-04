import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import AnalysisResult from '../components/AnalysisResult';

describe('AnalysisResult', () => {
    it('displays analysis result correctly', async () => {
      // Define input text and analysis result
      const inputText = 'Test message';
      const analysisResult = 'Sentiment of text: Positive';
  
      // Render AnalysisResult component
      const { getByAltText, getByText } = render(
        <AnalysisResult inputText={inputText} analysisResult={analysisResult} />
      );
  
      // Check if profile picture is rendered
      const profilePicture = getByAltText('Profile');
      expect(profilePicture).toBeInTheDocument();
    });
  });
  
