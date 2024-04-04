import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import TextInput from '../components/TextInput';

describe('TextInput', () => {
    it('renders correctly', () => {
      render(<TextInput />);
      
      // Check if greeting and check-in text are rendered
      expect(screen.getByText('Hello, Dani')).toBeInTheDocument();
      expect(screen.getByText('Just a quick check in')).toBeInTheDocument();
  
      // Check if input box and submit button are rendered
      const input = screen.getByPlaceholderText('Chat with CynchAI...');
      expect(input).toBeInTheDocument();
      expect(screen.getByTestId('submitButton')).toBeInTheDocument();
    });
  
    it('updates input value correctly', () => {
      render(<TextInput />);
      const input = screen.getByPlaceholderText('Chat with CynchAI...');
  
      // Simulate user typing in input field
      fireEvent.change(input, { target: { value: 'Test message' } });
  
      // Check if input value is updated
      expect(input.value).toBe('Test message');
    });
  
    it('submits input correctly', async () => {
      render(<TextInput />);
      const input = screen.getByPlaceholderText('Chat with CynchAI...');
  
      // Simulate user typing in input field
      fireEvent.change(input, { target: { value: 'Test message' } });
  
      // Simulate user pressing enter key to submit
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
  
      // Wait for the analysis result to be rendered
      await waitFor(() => {
        expect(screen.getByText('Analysis result for "Test message":')).toBeInTheDocument();
      });
    });
  });