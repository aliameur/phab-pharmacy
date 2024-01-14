jest.mock('@react-navigation/native', () => {
    return {
      useNavigation: jest.fn(),
      useRoute: jest.fn(),
      NavigationContainer: ({ children }) => <div>{children}</div>, 
    };
  });
  
jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: jest.fn(() => ({
      Navigator: ({ children }) => <div>{children}</div>, 
      Screen: ({ children }) => <div>{children}</div>, 
    })),
  };
});

jest.mock('@react-native-voice/voice', () => {
  return {
    onSpeechStart: jest.fn(),
    onSpeechEnd: jest.fn(),
  };
});

jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
  getString: jest.fn(() => Promise.resolve('mocked clipboard content')),
}));

jest.mock('react-native-tts', () => {
  return {
    speak: jest.fn(),
    stop: jest.fn(),
  };
});

jest.mock('react-native-keychain', () => {
  return {
    getGenericPassword: jest.fn(),
  };
});

jest.mock('@stripe/stripe-react-native', () => {
  return {
    StripeProvider: jest.fn().mockReturnValue(null),
  };
});
  
jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve('mocked value')),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: ({ children }) => (
    <div data-testid="keyboard-aware-scroll-view-mock">{children}</div>
  ),
}));

jest.mock('react-native-reanimated-carousel', () => {
  const React = require('react');

  // Mock the Carousel component with a placeholder component
  const Carousel = ({ children }) => {
    return <div data-testid="carousel-mock">{children}</div>;
  };

  return {
    __esModule: true,
    default: Carousel,
  };
});
