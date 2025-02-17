import { Icon } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import { customMapStyle } from '../Utillity/mapstyle';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { object } from 'yup';
import AdditionalTimeModal from '../Components/AdditionalTimeModal';
import { getDistance, isValidCoordinate } from 'geolib';

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { mode } from 'native-base/lib/typescript/theme/tools';
import CountdownTimer from '../Components/CountdownTimer';
import { firebase } from '@react-native-firebase/messaging';

const RideScreen = ({ route }) => {
  const { data, type } = route?.params;
  const rideData = route?.params?.data;
  const rider_arrived_time = route?.params?.rider_arrived_time;
  const isFocused = useIsFocused();
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const [additionalTime, setAdditionalTime] = useState(false);
  const [additionalTimeModal, setAdditionalTimeModal] = useState(false);
  const [isriderArrive, setIsRiderArrived] = useState(false);
  const [addTime, setAddTime] = useState(0);
  const [time, setTime] = useState(0);
  const { user_type } = useSelector(state => state.authReducer);
  const [start_waiting, setStartWaiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [arrive, setArrive] = useState(false);
  const [passengerArrive, setPassengerArrive] = useState(false);
  const [fare, setFare] = useState(0);
  const [distance, setDistance] = useState(0);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const apikey = 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM';
  const origin = {
    lat:
      type === 'details'
        ? currentPosition?.latitude
        : parseFloat(data?.ride_info?.pickup_location_lat),
    lng:
      type === 'details'
        ? currentPosition?.longitude
        : parseFloat(data?.ride_info?.pickup_location_lng),
  };
  const destination = {
    lat:
      type === 'details'
        ? parseFloat(data?.pickup_location_lat)
        : parseFloat(data?.ride_info?.rider?.lat),
    lng:
      type === 'details'
        ? parseFloat(data?.pickup_location_lng)
        : parseFloat(data?.ride_info?.rider?.lng),
  };

  useEffect(() => {
    if (currentPosition && data?.pickup_location_lat != null) {
      const dropLocation = {
        latitude: parseFloat(data?.pickup_location_lat),
        longitude: parseFloat(data?.pickup_location_lng),
      };
      const checkDistanceBetween = getDistance(currentPosition, dropLocation);
      let km = Math.round(checkDistanceBetween / 1000);
      const getTravelTime = async () => {
        const GOOGLE_MAPS_API_KEY = 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM';
        try {
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${currentPosition?.latitude},${currentPosition?.longitude}&destinations=${dropLocation.latitude},${dropLocation.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data.status === 'OK') {
            const distanceMatrix = data.rows[0].elements[0];
            const travelTime = distanceMatrix.duration.text;
            return setTime(travelTime);
          } else {
            console.error('Error fetching travel time:', data.status);
            return null;
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getTravelTime();
    }
  }, [currentPosition]);

  useEffect(() => {
    getCurrentLocation();
  }, [isFocused]);
  const onPressStartNavigation = async () => {
    // updateStatus('OnGoing');
    // setStartNavigation(true);
    const pickup = {
      latitude: parseFloat(data?.pickup_location_lat),
      longitude: parseFloat(data?.pickup_location_lng),
    };
    const dropoff = {
      latitude: parseFloat(data?.dropoff_location_lat),
      longitude: parseFloat(data?.dropoff_location_lng),
    };
    const url = `https://www.google.com/maps/dir/?api=1&origin=${pickup?.latitude},${pickup?.longitude}&destination=${dropoff?.latitude},${dropoff?.longitude}&travelmode=driving`;
    // Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition(prevLocation => ({
          ...prevLocation,
          latitude,
          longitude,
        }));
        const isLocationClose = (lat1, lon1, lat2, lon2, threshold = 0.0001) =>
          Math.abs(lat1 - lat2) < threshold &&
          Math.abs(lon1 - lon2) < threshold;
        if (isLocationClose(37.4219983, -122.084, 37.4219983, -122.084)) {
          // if (isLocationClose(latitude, origin?.lat, longitude, origin?.lng)) {
          console.log(
            'location same eeeeeeeeeeeeeeeeeeeeeeeeee',
            latitude,
            origin.lat,
            longitude,
            origin.lng,
          );
          setIsRiderArrived(true);
        } else {
          console.log('location  are not sameeeeeeeeeeeeeeeeeeeeeeeeeee');
          setAdditionalTimeModal(true);
        }
      },
      error => console.log('Error getting location:', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
        interval: 1000,
      },
    );
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [isFocused]);

  const getCurrentLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            resolve(coords);
            getAddressFromCoordinates(
              position.coords.latitude,
              position.coords.longitude,
            );
          },
          error => {
            reject(new Error(error.message));
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      });
      setCurrentPosition(position);
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        const givenaddress = data.results[0].formatted_address;
        setAddress(givenaddress);
      } else {
        console.log('No address found');
      }
    } catch (error) {
      console.error('--------------------------------- error', error);
    }
  };

  useEffect(() => {
    const reigion = {
      latitude: parseFloat(currentPosition?.latitude),
      longitude: parseFloat(currentPosition?.longitude),
      latitudeDelta: 0.0522,
      longitudeDelta: 0.0521,
    };
    mapRef.current?.animateToRegion(reigion, 1000);
  }, [currentPosition]);

  
  useEffect(() => {
    console.log('------------------- from fire base useEffect --------------------------------')
    const ref = database().ref('requests');
    ref.on('value', snapshot => {
      if (snapshot.exists()) {
        const { latitude, longitude } = snapshot.val();

        // Calculate distance
        const distance = getDistanceFromLatLonInMeters(
          latitude,
          longitude,
          destination?.latitude,
          destination?.longitude
        );
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ', latitude,
          longitude,
          destination?.latitude,
          destination?.longitude)
        if (distance < 50) {
          Alert.alert('Arrived!', 'You have reached your destination.', [
            { text: 'OK', onPress: () => navigation.navigate('DestinationScreen') },
          ]);
        }
      }
    });

    return () => ref.off();
  }, [isFocused]);

  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Radius of the earth in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };
  return (
    <SafeAreaView style={styles.safe_are}>
      <Header
        showBack={true}
        title={
          additionalTime
            ? 'Wait For Additional Time'
            : user_type === 'Rider'
              ? 'Navigation to Pickup'
              : 'Waiting Pickup'
        }
      />
      <View style={styles.main_view}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(currentPosition?.latitude),
            longitude: parseFloat(currentPosition?.longitude),
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0521,
          }}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          customMapStyle={customMapStyle}>
          <Marker
            coordinate={{
              latitude: origin?.lat,
              longitude: origin?.lng,
            }}
            pinColor={Color.black}
          />
          <MapViewDirections
            apikey={'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM'}
            origin={{
              latitude: origin?.lat,
              longitude: origin?.lng,
            }}
            destination={{
              latitude: destination?.lat,
              longitude: destination?.lng,
            }}
            strokeColor={Color.themeBlack}
            strokeWidth={6}
            onError={error => console.log('MapViewDirections Error:', error)}
            onReady={result => {
              if (mapRef.current) {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 50,
                    left: 50,
                    top: 300,
                    bottom: 100,
                  },
                });
              }
            }}
          />
          <Marker
            pinColor={Color.black}
            coordinate={{
              latitude: destination?.lat,
              longitude: destination?.lng,
            }}
          />
        </MapView>

        {user_type === 'Rider' && passengerArrive === true ? (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: windowHeight * 0.2,
              width: windowWidth,
            }}>
            <CustomButton
              text={'DRIVE'}
              fontSize={moderateScale(14, 0.3)}
              textColor={Color.white}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.85}
              marginTop={moderateScale(10, 0.3)}
              height={windowHeight * 0.07}
              bgColor={Color.darkBlue}
              borderWidth={1.5}
              borderColor={Color.darkBlue}
              textTransform={'capitalize'}
              isBold
              onPress={() => {
                console.log('trying to navigate tracknng screen ');
                const url = `https://www.google.com/maps/dir/?api=1&origin=${currentPosition?.latitude},${currentPosition?.longitude}&destination=${destination?.lat},${destination?.lng}&travelmode=driving`;
                Linking.openURL(url).catch(err =>
                  console.error('An error occurred', err),
                );
              }}
            />
          </View>
        ) : (
          <>
            {additionalTime ? (
              <CountdownTimer
                // addTime={addTime}
                initialTime={addTime}
                onComplete={() => {
                  // setAdditionalTimeModal(true);
                  // setAdditionalTime(true);
                }}
              />
            ) : (
              // <View
              //   style={[
              //     styles.waiting_card,
              //     {
              //       height: windowHeight * 0.15,
              //       bottom: 100,
              //       position: 'absolute',
              //       alignItems: 'center',
              //       justifyContent: 'center',
              //     },
              //   ]}>
              //   <CustomText isBold style={styles.time}>
              //     01 : 59
              //   </CustomText>
              // </View>
              <>
                {user_type === 'Customer' ? (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 100,
                      alignSelf: 'center',
                    }}>
                    <View
                      style={[
                        styles.waiting_card,
                        {
                          height:
                            user_type === 'Rider'
                              ? windowHeight * 0.32
                              : windowHeight * 0.25,
                        },
                      ]}>
                      <View
                        style={[styles.row_view, { justifyContent: 'center' }]}>
                        <CustomText style={styles.text_view}>
                          Waiting PickUp
                        </CustomText>
                        <Icon
                          name="cross"
                          as={Entypo}
                          size={moderateScale(18, 0.6)}
                          color={Color.veryLightGray}
                          style={{ position: 'absolute', right: 0 }}
                        />
                      </View>
                      <View style={styles.location_text_view}>
                        <Icon
                          name="map-marker-alt"
                          as={FontAwesome5}
                          size={moderateScale(14, 0.6)}
                          color={Color.veryLightGray}
                          style={{ left: 5 }}
                        />
                        <CustomText numberOfLines={1} style={styles.text}>
                          {rideData?.ride_info?.location_from}
                        </CustomText>
                      </View>
                      <View
                        style={[
                          styles.location_text_view,
                          { marginTop: moderateScale(10, 0.6) },
                        ]}>
                        <Icon
                          name="map-marker-alt"
                          as={FontAwesome5}
                          size={moderateScale(14, 0.6)}
                          color={Color.veryLightGray}
                          style={{ left: 5 }}
                        />
                        <CustomText numberOfLines={1} style={styles.text}>
                          {rideData?.ride_info?.location_to}
                        </CustomText>
                      </View>
                      <View
                        style={[
                          styles.row_view,
                          { marginTop: moderateScale(10, 0.6) },
                        ]}>
                        {/* <TouchableOpacity
                          // onPress={() => setAdditionalTime(true)}
                          style={[
                            styles.row_view,
                            {justifyContent: 'flex-start'},
                          ]}>
                          <Icon
                            name="plus"
                            as={FontAwesome5}
                            color={Color.grey}
                            size={moderateScale(10, 0.6)}
                          />
                          <CustomText
                            onPress={() => {
                              setAdditionalTimeModal(true);
                            }}
                            style={styles.text2}>
                            ADD ADDITIONAL TIME
                          </CustomText>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                          style={{}}
                          onPress={() => {
                            navigationService.navigate(
                              'ChooseDeclineReasonScreen',
                              { data: rideData },
                            );
                          }}>
                          <CustomText
                            onPress={() => {
                              navigationService.navigate(
                                'ChooseDeclineReasonScreen',
                                { data: rideData },
                              );
                            }}
                            style={styles.text2}>
                            CANCEL RIDE
                          </CustomText>
                        </TouchableOpacity>
                      </View>
                      <CustomButton
                        text={'PAY Now'}
                        fontSize={moderateScale(14, 0.3)}
                        textColor={Color.white}
                        borderRadius={moderateScale(30, 0.3)}
                        width={windowWidth * 0.85}
                        marginTop={moderateScale(10, 0.3)}
                        height={windowHeight * 0.07}
                        bgColor={Color.themeBlack}
                        textTransform={'capitalize'}
                        isBold
                        onPress={() =>
                          navigationService.navigate('PaymentScreen', {
                            data: rideData,
                          })
                        }
                      />
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      width: windowWidth,
                      height: windowHeight * 0.2,
                      position: 'absolute',
                      bottom: 0,
                    }}>
                    {isriderArrive && !arrive ? (
                      <CustomButton
                        onPress={() => {
                          setArrive(true);
                        }}
                        text={'ARRIVE LOCATION'}
                        fontSize={moderateScale(14, 0.3)}
                        textColor={Color.white}
                        borderRadius={moderateScale(30, 0.3)}
                        width={windowWidth * 0.85}
                        marginTop={moderateScale(10, 0.3)}
                        height={windowHeight * 0.07}
                        bgColor={Color.darkBlue}
                        textTransform={'capitalize'}
                        isBold
                      />
                    ) : start_waiting == false ? (
                      <CustomButton
                        style={{
                          position: 'absolute',
                          bottom: 100,
                        }}
                        text={'start waiting'}
                        fontSize={moderateScale(14, 0.3)}
                        textColor={Color.white}
                        borderRadius={moderateScale(30, 0.3)}
                        width={windowWidth * 0.85}
                        marginTop={moderateScale(10, 0.3)}
                        height={windowHeight * 0.07}
                        bgColor={Color.darkBlue}
                        textTransform={'capitalize'}
                        isBold
                        onPress={() => {
                          setStartWaiting(true);
                        }}
                      />
                    ) : (
                      <CustomButton
                        text={'arrive '}
                        fontSize={moderateScale(14, 0.3)}
                        textColor={Color.white}
                        borderRadius={moderateScale(30, 0.3)}
                        width={windowWidth * 0.85}
                        height={windowHeight * 0.07}
                        bgColor={Color.darkBlue}
                        borderWidth={1}
                        borderColor={Color.blue}
                        textTransform={'capitalize'}
                        // style={{bottom: 60}}
                        isBold
                        onPress={() => setPassengerArrive(true)}
                      />
                    )}
                  </View>
                )}
              </>
            )}
          </>
        )}
      </View>
      <AdditionalTimeModal
        setAdditionalTime={setAdditionalTime}
        modalvisibe={additionalTimeModal}
        setTime={setAddTime}
        setModalVisible={setAdditionalTimeModal}
      />
    </SafeAreaView>
  );
};

export default RideScreen;

const styles = StyleSheet.create({
  safe_are: {
    width: windowWidth,
    height: windowHeight,
  },

  main_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
  },
  map_view: {
    height: windowHeight * 0.7,
    width: windowWidth,
    borderRadius: moderateScale(40, 0.6),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.grey,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  waiting_card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.25,
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: moderateScale(20, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    bottom: 70,
  },
  text_view: {
    fontSize: moderateScale(15, 0.6),
    textAlign: 'center',
  },
  row_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  location_text_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: moderateScale(40, 0.6),
    borderWidth: 0.6,
    borderColor: Color.lightGrey,
    borderRadius: moderateScale(10, 0.6),
    marginTop: moderateScale(20, 0.6),
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    color: Color.veryLightGray,
    marginLeft: moderateScale(10, 0.6),
  },
  text2: {
    fontSize: moderateScale(12, 0.6),
    color: Color.black,
    marginLeft: moderateScale(5, 0.6),
    fontWeight: '600',
  },
});
