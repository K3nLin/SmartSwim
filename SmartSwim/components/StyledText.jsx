import {Text} from 'react-native';

const StyledText = ({textStyle, children, ...props}) => {
  return (
    <Text
      className={textStyle}
      style={{fontFamily: 'Kavoon-Regular'}}
      {...props}>
      {children}
    </Text>
  );
};

export default StyledText;
