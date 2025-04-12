import {View, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BASE_URL from '../../backend/config/backendconfig';
import WorkoutInstance from '../../components/WorkoutInstance';
import StyledText from '../../components/StyledText';
import CustomButton from '../../components/CustomButton';

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    getWorkouts();
  }, []);

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };

  const getWorkouts = async () => {
    const token = await getToken();
    if (!token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/tabs/workouts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch workouts: ${res.status}`);
      }

      const data = await res.json();
      setWorkouts(data);
    } catch (err) {
      console.error('Error getting workout data', err);
      Alert.alert('Error', 'Failed to load workouts');
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full space-y-5">
      <CustomButton
        title={'Refresh'}
        handlePress={getWorkouts}
        textStyles={'text-white text-3xl'}
        bgColor="bg-green-500"
      />
      <ScrollView
        className="flex"
        contentContainerStyle={{
          height: '100%',
          alignItems: 'center',
          rowGap: 14,
        }}>
        {workouts.length > 0 ? (
          workouts.map((workout, i) => (
            <WorkoutInstance
              key={`workout-${i}`}
              workoutDate={workout.workoutDate}
              distance={workout.distance}
              seaState={workout.seaState}
              temperature={workout.temperature}
              strokeCount={workout.strokeCount}
            />
          ))
        ) : (
          <StyledText className="text-white text-center mt-10">
            No workouts found
          </StyledText>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutHistory;
