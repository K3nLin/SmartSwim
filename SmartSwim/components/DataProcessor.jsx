import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

const DataProcessor = ({
  onProcessedData,
  receivedData,
  distanceGoal,
  stopReadHandler,
  stopStatus,
  onHalfway,
}) => {
  const [totalDistance, setTotalDistance] = useState(0);
  const [previousCoords, setPreviousCoords] = useState(null);
  const [seaState, setSeaState] = useState('Calm');
  const [temperature, setTemperature] = useState(0);
  const [strokeCount, setStrokeCount] = useState(0);
  const [stopSent, setStopSent] = useState(false);
  const [halfAudioPlayed, setHalfAudioPlayed] = useState(false);

  useEffect(() => {
    if (stopStatus) {
      setTotalDistance(0);
      setSeaState('Calm');
      setTemperature(0);
      setStrokeCount(0);
      setPreviousCoords(null);
      setStopSent(false);
      setHalfAudioPlayed(false);
    }
  }, [stopStatus]);

  // Haversine formula
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const toRad = angle => (Math.PI / 180) * angle;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  useEffect(() => {
    if (stopStatus) return; // Stop updates if already stopped

    const latestData = receivedData[receivedData.length - 1];

    if (!latestData) return;

    if (latestData.position) {
      const {position} = latestData;
      const [lat, lon] = position;

      if (previousCoords) {
        const [prevLat, prevLon] = previousCoords;
        const distance = haversineDistance(prevLat, prevLon, lat, lon);
        console.log('USER INPUT DISTANCE', distanceGoal);

        const goalInMeters =
          distanceGoal.units === 'ft'
            ? Number(distanceGoal.distance) / 3.28084
            : Number(distanceGoal.distance);

        const newTotalDistance = totalDistance + distance;
        setTotalDistance(prev => prev + distance);

        console.log(
          `Total Distance Traveled: ${newTotalDistance}\nDistance Goal: ${goalInMeters}`,
        );

        if (!halfAudioPlayed && newTotalDistance >= goalInMeters / 2) {
          console.log('Playing halfway audio');
          onHalfway();
          setHalfAudioPlayed(true);
        }

        if (newTotalDistance >= goalInMeters) {
          if (!stopSent) {
            console.log('Stopping workout - Goal reached!');
            stopReadHandler();
            setStopSent(true);
          }
        }
      }
      setPreviousCoords([lat, lon]);
    }

    if (latestData.acceleration) {
      const {acceleration} = latestData;
      const magnitude = Math.sqrt(
        acceleration[0] ** 2 + acceleration[1] ** 2 + acceleration[2] ** 2,
      );

      setSeaState(
        magnitude > 20
          ? 'Very Rough'
          : magnitude > 15
          ? 'Rough'
          : magnitude > 10
          ? 'Moderate'
          : 'Calm',
      );

      if (magnitude > 10) {
        setStrokeCount(prev => prev + 1);
      }

      console.log(`MAGNITUDE: ${magnitude}\n STROKECOUNT: ${strokeCount}`);
    }

    if (latestData.temperature) {
      setTemperature(latestData.temperature);
    }

    const [distance, units] =
      distanceGoal.units === 'ft'
        ? [totalDistance * 3.28084, 'ft']
        : [totalDistance, 'm'];

    onProcessedData?.({
      totalDistance: {distance, units},
      seaState,
      temperature,
      strokeCount,
    });
  }, [receivedData, distanceGoal]);

  return null;
};

export default DataProcessor;
