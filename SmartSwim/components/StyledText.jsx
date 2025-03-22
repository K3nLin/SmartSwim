import {Text} from 'react-native';

const StyledText = ({textStyle, children, ...props}) => {
  return (
    <Text className={`${textStyle} font-kavoon`} {...props}>
      {children}
    </Text>
  );
};

export default StyledText;
