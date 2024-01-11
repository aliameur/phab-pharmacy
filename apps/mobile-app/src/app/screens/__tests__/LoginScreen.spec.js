import { render } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen'; 
import { fireEvent } from '@testing-library/react-native';
  
describe('LoginScreen', () => {

    it('renders the login screen', () => {
        const { getByText, getByPlaceholderText } = render(<LoginScreen />);
        
        expect(getByText('Welcome back!')).toBeTruthy();
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
        expect(getByText('Login')).toBeTruthy();
        expect(getByText('No Account?')).toBeTruthy();
      });

    it('updates email and password state on user input', () => {
        const mockNavigation = { navigate: jest.fn(), replace: jest.fn() };
        const { getByPlaceholderText } = render(<LoginScreen navigation={mockNavigation} />);
    
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
    
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password123');
    
        expect(emailInput.props.value).toBe('test@example.com');
        expect(passwordInput.props.value).toBe('password123');
    });
    
    it('toggles password visibility when eye icon is pressed', () => {
        const { getByTestId } = render(<LoginScreen />);
        
        const passwordInput = getByTestId('password-input');
        const eyeIcon = getByTestId('eye-icon');
        
        expect(passwordInput.props.secureTextEntry).toBeTruthy(); 
        
        fireEvent.press(eyeIcon); 
        
        expect(passwordInput.props.secureTextEntry).toBeFalsy(); 
        
        fireEvent.press(eyeIcon); 
        
        expect(passwordInput.props.secureTextEntry).toBeTruthy(); 
      });

      it('navigates to the Sign Up screen when the "Sign Up" link is pressed', () => {
        const navigationMock = {
          navigate: jest.fn(),
        };
        
        const { getByText } = render(<LoginScreen navigation={navigationMock} />);
        
        const signUpLink = getByText('Sign Up');
        
        fireEvent.press(signUpLink);
        
        expect(navigationMock.navigate).toHaveBeenCalledWith('Sign Up');
      });
});




  
