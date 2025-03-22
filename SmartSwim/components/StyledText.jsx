import { Text } from "react-native";

const StyledText = ({ style, children, ...props }) => {
  return (
    <Text
      style={[{ fontFamily: "Kavoon_400Regular" }, (classname = { style })]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default StyledText;
