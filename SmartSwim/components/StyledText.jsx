import {Text, StyleSheet} from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'lavender',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   quicksandLight: {
//     fontFamily: 'Quicksand-Light',
//     fontSize: 20,
//   },
//   quicksandRegular: {
//     fontFamily: 'Quicksand-Regular',
//     fontSize: 20,
//   },
//   ralewayItalic: {
//     fontFamily: 'Raleway-Italic',
//     fontSize: 20,
//   },
//   ralewayThin: {
//     fontFamily: 'Raleway-ThinItalic',
//     fontSize: 20,
//   },
// });

const StyledText = ({style, children, ...props}) => {
  return (
    <Text style={{fontFamily: 'Kavoon-Regular'}} className={style} {...props}>
      {children}
    </Text>
  );
};

export default StyledText;
