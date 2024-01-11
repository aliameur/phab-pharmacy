import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignUpScreen from '../SignUpScreen';


describe('SignUpScreen', () => {
  it('renders the sign-up screen with input fields and a sign-up button', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<SignUpScreen />);
    
    expect(getByPlaceholderText('First Name')).toBeTruthy();
    expect(getByPlaceholderText('Last Name')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('updates the state when typing in the input fields', () => {
    const { getByPlaceholderText } = render(<SignUpScreen />);
    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(emailInput, 'john@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(firstNameInput.props.value).toBe('John');
    expect(lastNameInput.props.value).toBe('Doe');
    expect(emailInput.props.value).toBe('john@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });
  
});
