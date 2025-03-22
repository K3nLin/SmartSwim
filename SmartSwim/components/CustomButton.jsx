import { TouchableOpacity, Text, View } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  bgColor = "bg-secondary",
  rounded = "rounded-xl",
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isLoading}
      className={`
            ${bgColor} px-3 py-2 justify-center items-center ${rounded} ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }
        `}
    >
      <Text
        className={`${textStyles}`}
        style={{
          fontFamily: "Kavoon_400Regular",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
