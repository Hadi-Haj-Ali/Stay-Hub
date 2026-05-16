jest.mock('lucide-react-native', () => {
  const React = require('react');
  const { Text } = require('react-native');

  const MockIcon = ({ testID }) => {
    return React.createElement(Text, { testID }, 'Icon');
  };

  return {
    Heart: MockIcon,
    Clock: MockIcon,
    Home: MockIcon,
    User: MockIcon,
    Plus: MockIcon,
    MapPin: MockIcon,
    Search: MockIcon,
    Database: MockIcon,
    Edit: MockIcon,
    Bell: MockIcon,
    Shield: MockIcon,
    HelpCircle: MockIcon,
    LogOut: MockIcon,
    Moon: MockIcon,
  };
});