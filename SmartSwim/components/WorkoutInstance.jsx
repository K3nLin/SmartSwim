import {View, Text} from 'react-native';
import React from 'react';
import StyledText from './StyledText';

const formatDate = dateString => {
  if (!dateString) return 'Invalid Date'; // Handle undefined/null cases

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid Date'; // Handle invalid date cases

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date);
};

const WorkoutInstance = ({workoutDate, distance, seaState, strokeCount}) => {
  console.log(workoutDate, distance, seaState, strokeCount);

  return (
    <View className="bg-secondary flex items-center w-1/2 rounded-2xl">
      <StyledText textStyle={'text-white text-2xl'}>
        {formatDate(workoutDate)}
      </StyledText>
      <StyledText
        textStyle={
          'text-white text-2xl'
        }>{`Total Distance: ${distance} m`}</StyledText>
      <StyledText
        textStyle={'text-white text-2xl'}>{`${seaState} sea`}</StyledText>
      <StyledText
        textStyle={
          'text-white text-2xl'
        }>{`Strokes: ${strokeCount}`}</StyledText>
    </View>
  );
};

export default WorkoutInstance;
