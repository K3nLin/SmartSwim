import React, {useEffect, useState} from 'react';
import {
  View,
  Alert,
  PermissionsAndroid,
  Platform,
  Vibration,
} from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import Sound from 'react-native-sound';
import CustomButton from './CustomButton.jsx';
import DataProcessor from './DataProcessor.jsx';

const BluetoothComponent = ({
  onProcessedData,
  setConnectionStatus,
  sendStartSignalRef,
  sendStopSignalRef,
  readDataRef,
  stopReadDataRef,
  onStopWorkout,
  onSetReceivedData,
  receivedData,
  setIsStartedUI,
}) => {
  const [device, setDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [distanceGoal, setDistanceGoal] = useState({distance: '', units: 'm'});
  const [isStopped, setIsStopped] = useState(false);

  let dataSubscription = null;

  useEffect(() => {
    return () => {
      if (dataSubscription) {
        dataSubscription.remove();
        console.log('Cleaned up Bluetooth listener on unmount.');
      }
    };
  }, []);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      try {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
      } catch (err) {
        console.warn('Permission request error:', err);
      }
    }
  };

  const scanAndConnect = async () => {
    try {
      const pairedDevices = await RNBluetoothClassic.getBondedDevices();
      console.log('Paired Devices:', pairedDevices);

      const espDevice = pairedDevices.find(d => d.name === 'ESP32-BT-Slave');

      if (!espDevice) {
        Alert.alert('Device Not Found', 'Make sure the ESP32 is paired.');
        return;
      }

      const connected = await espDevice.connect();
      if (connected) {
        setDevice(espDevice);
        setIsConnected(true);
        setConnectionStatus('Connected to ESP32');
        console.log('Connected to:', espDevice.name);
      }
    } catch (error) {
      console.error('Connection Error:', error);
      Alert.alert('Connection Failed', 'Could not connect to ESP32.');
    }
  };

  const sendStartSignal = async distanceGoal => {
    if (!device || !isConnected) {
      Alert.alert('Error', 'Device not connected');
      return;
    }
    try {
      setDistanceGoal({
        distance: distanceGoal.distance,
        units: distanceGoal.units,
      });

      await device.write('start\n');
      console.log('Start signal sent!');
      Alert.alert('Success', 'Start signal sent to ESP32.');
      setIsStopped(false);
      setIsStartedUI(true);
    } catch (error) {
      console.error('Write error:', error);
      Alert.alert('Error', 'Failed to send start signal.');
    }
  };

  const playStopAlarm = () => {
    const alarmSound = new Sound('alarm.wav', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error loading sound:', error);
        return;
      }

      let playCount = 0;
      const playAlarm = () => {
        if (playCount < 3) {
          alarmSound.play(success => {
            if (success) {
              playCount++;
              playAlarm();
            } else {
              console.log('Playback failed');
            }
          });
        }
      };

      playAlarm();
    });
  };

  const playHalfAlarm = () => {
    const alarmSound = new Sound(
      'halfwayalarm.wav',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Error loading sound:', error);
          return;
        }

        let playCount = 0;
        const playAlarm = () => {
          if (playCount < 2) {
            alarmSound.play(success => {
              if (success) {
                playCount++;
                playAlarm();
              } else {
                console.log('Playback failed');
              }
            });
          }
        };

        playAlarm();
      },
    );
  };

  const handleStopWorkout = async (source = 'user') => {
    if (!device || !isConnected) {
      Alert.alert('Error', 'Device not connected');
      return;
    }

    try {
      //  Send stop signal to ESP32 in ALL cases
      await device.write('stop\n');
      console.log('Stop signal sent!');

      playStopAlarm();

      if (source === 'user') {
        Alert.alert('Success', 'Stop signal sent to ESP32.');
      }
    } catch (err) {
      console.error('Error sending stop signal:', err);
    }

    if (onStopWorkout) {
      onStopWorkout(); // Save workout
    }

    onSetReceivedData([]);
    setIsStopped(true);
    setIsStartedUI(false);
  };

  const sendStopSignal = async () => {
    await handleStopWorkout('user');
  };

  const readData = async () => {
    if (!device || !isConnected) {
      Alert.alert('Error', 'Device not connected');
      return;
    }

    if (dataSubscription) {
      console.warn('Already listening for data');
      return;
    }

    try {
      dataSubscription = device.onDataReceived(event => {
        const rawData = event.data.trim();
        console.log('Raw Received Data:', rawData);

        if (isValidJSON(rawData)) {
          const jsonData = JSON.parse(rawData);
          onSetReceivedData(prev => [...prev, jsonData]);
          console.log('Parsed JSON:', jsonData);
        } else {
          console.warn('Received non-JSON data:', rawData);
        }
      });
    } catch (error) {
      console.error('Read error:', error);
    }
  };

  const isValidJSON = str => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const stopReadData = () => {
    playStopAlarm();
    handleStopWorkout('auto');

    if (dataSubscription) {
      dataSubscription.remove();
      dataSubscription = null;
      console.log('Stopped reading data.');
    }
  };

  // Assign function references for external calls
  if (sendStartSignalRef) sendStartSignalRef.current = sendStartSignal;
  if (sendStopSignalRef) sendStopSignalRef.current = sendStopSignal;
  if (readDataRef) readDataRef.current = readData;
  if (stopReadDataRef) stopReadDataRef.current = stopReadData;

  return (
    <View>
      <CustomButton
        title="Connect Device"
        containerStyles={'h-12 w-50'}
        textStyles={'text-white'}
        bgColor="bg-green-500"
        handlePress={scanAndConnect}
      />
      <DataProcessor
        onProcessedData={onProcessedData}
        receivedData={receivedData}
        distanceGoal={distanceGoal}
        stopReadHandler={stopReadData}
        stopStatus={isStopped}
        onHalfway={playHalfAlarm}
      />
    </View>
  );
};

export default BluetoothComponent;
