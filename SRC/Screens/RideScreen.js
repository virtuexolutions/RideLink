import {Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import {customMapStyle} from '../Utillity/mapstyle';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useIsFocused} from '@react-navigation/native';
import {object} from 'yup';
import AdditionalTimeModal from '../Components/AdditionalTimeModal';
import {getDistance, isValidCoordinate} from 'geolib';

import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {mode} from 'native-base/lib/typescript/theme/tools';
import CountdownTimer from '../Components/CountdownTimer';

const RideScreen = ({route}) => {
  const {data, type} = route?.params;
  const rideData = route?.params?.data;
  const rider_arrived_time = route?.params?.rider_arrived_time;
  const isFocused = useIsFocused();
  const mapRef = useRef(null);
  const token = useSelector(state => state.authReducer.token);
  const [additionalTime, setAdditionalTime] = useState(false);
  const [additionalTimeModal, setAdditionalTimeModal] = useState(false);
  const [isriderArrive, setIsRiderArrived] = useState(false);
  const [addTime, setAddTime] = useState(0);
  const [time, setTime] = useState(0);
  const {user_type} = useSelector(state => state.authReducer);
  const [start_waiting, setStartWaiting] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [arrive, setArrive] = useState(false);
  console.log('🚀 ~ arrive:', arrive);
  const [selectedTime, setSelectedTime] = useState('');
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
  console.log('🚀 ~ RideScreen ~ origin:', origin);
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
            console.log(travelTime, 'travelTime');
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
  const checkLocation = async () => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
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
  };

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

  const rideCancel = async () => {
    const url = `auth/customer/ride_update/${data?.ride_id}`;
    setIsLoading(true);
    const response = await Post(url, {status: 'cancel'}, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      navigationService.navigate('MapScreen', {
        ridedata: data,
        fromrideScreen: true,
      });
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

        {user_type === 'Rider' && start_waiting === true ? (
          <>
            {/* <CustomButton
              text={'+ ADD ADDITIONAL TIME'}
              fontSize={moderateScale(14, 0.3)}
              textColor={Color.white}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.85}
              marginTop={moderateScale(10, 0.3)}
              height={windowHeight * 0.07}
              bgColor={Color.darkBlue}
              textTransform={'capitalize'}
              isBold
              onPress={() => setAdditionalTime(true)}
            /> */}
            <CustomButton
              text={'DRIVE'}
              fontSize={moderateScale(14, 0.3)}
              textColor={Color.black}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.85}
              marginTop={moderateScale(10, 0.3)}
              height={windowHeight * 0.07}
              bgColor={Color.white}
              borderWidth={1.5}
              borderColor={Color.darkBlue}
              textTransform={'capitalize'}
              isBold
              onPress={() =>
                navigationService.navigate('PassengerDetails', {
                  type: 'passangerIdentity',
                })
              }
            />
          </>
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
                        style={[styles.row_view, {justifyContent: 'center'}]}>
                        <CustomText style={styles.text_view}>
                          Waiting PickUp
                        </CustomText>
                        <Icon
                          name="cross"
                          as={Entypo}
                          size={moderateScale(18, 0.6)}
                          color={Color.veryLightGray}
                          style={{position: 'absolute', right: 0}}
                        />
                      </View>
                      <View style={styles.location_text_view}>
                        <Icon
                          name="map-marker-alt"
                          as={FontAwesome5}
                          size={moderateScale(14, 0.6)}
                          color={Color.veryLightGray}
                          style={{left: 5}}
                        />
                        <CustomText numberOfLines={1} style={styles.text}>
                          {rideData?.ride_info?.location_from}
                        </CustomText>
                      </View>
                      <View
                        style={[
                          styles.location_text_view,
                          {marginTop: moderateScale(10, 0.6)},
                        ]}>
                        <Icon
                          name="map-marker-alt"
                          as={FontAwesome5}
                          size={moderateScale(14, 0.6)}
                          color={Color.veryLightGray}
                          style={{left: 5}}
                        />
                        <CustomText numberOfLines={1} style={styles.text}>
                          {rideData?.ride_info?.location_to}
                        </CustomText>
                      </View>
                      <View
                        style={[
                          styles.row_view,
                          {marginTop: moderateScale(10, 0.6)},
                        ]}>
                        <TouchableOpacity
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
                              additionalTimeModal(true);
                            }}
                            style={styles.text2}>
                            ADD ADDITIONAL TIME
                          </CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: 'red',
                          }}
                          onPress={() => {
                            rideCancel();
                          }}>
                          <CustomText
                            onPress={() => {
                              rideCancel();
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
                      // top :0
                      bottom: 0,
                    }}>
                    {!isriderArrive ? (
                      <CountdownTimer
                        initialTime={1}
                        // initialTime={parseInt(time, 10)}
                        onComplete={initialValue => {
                          checkLocation();
                        }}
                      />
                    ) : isriderArrive ? (
                      <CustomButton
                        onPress={() => {
                          setArrive(true);
                          console.log(
                            '------------------------------------ pohnch gya hu mai  ',
                          );
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
                    ) : arrive ? (
                      <CustomButton
                        text={'arrive '}
                        fontSize={moderateScale(14, 0.3)}
                        textColor={Color.black}
                        borderRadius={moderateScale(30, 0.3)}
                        width={windowWidth * 0.85}
                        height={windowHeight * 0.07}
                        bgColor={Color.white}
                        borderWidth={1}
                        borderColor={Color.blue}
                        textTransform={'capitalize'}
                        style={{bottom: 60}}
                        isBold
                        onPress={
                          () =>
                            console.log(
                              'hhhhhhhhhhhhhhhhhhhhhhhuuuuuuuuuuuuuu djhajkfshjksdhf jkahsdfjh',
                            )
                          //  setStartWaiting(true)
                        }
                      />
                    ) : (
                      <CustomButton
                        style={{
                          position: 'absolute',
                          bottom: 100,
                        }}
                        text={'stat waiting'}
                        fontSize={moderateScale(14, 0.3)}
                        textColor={Color.white}
                        borderRadius={moderateScale(30, 0.3)}
                        width={windowWidth * 0.85}
                        marginTop={moderateScale(10, 0.3)}
                        height={windowHeight * 0.07}
                        bgColor={Color.darkBlue}
                        textTransform={'capitalize'}
                        isBold
                        // onPress={() => setAdditionalTime(true)}
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
    justifyContent: 'space-between',
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
  time: {
    fontSize: moderateScale(35, 0.6),
    color: Color.black,
    textAlign: 'center',
  },
  pickerComponentStyleIOS: {
    backgroundColor: '#f0f0f0', // Light background
    borderRadius: 10, // Rounded edges
  },
  datePickerCommon: {
    backgroundColor: 'red',
    width: '80%', // Common picker width
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
});
