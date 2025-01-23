import {Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
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

const RideScreen = ({route}) => {
  const {data, type} = route.params;
  const data1 = route.params.rideupdatedData;
  console.log("🚀 ~ RideScreen ~ dat==================a1:", data1)

  const mapRef = useRef(null);
  // const rideStatus = props?.route?.params?.rideStatus;
  // const rideId = props?.route?.params?.rideId;
  // const pickupLocation = props?.route?.params?.pickupLocation;
  // const dropoffLocation = props?.route?.params?.dropoffLocation;
  // const Nearestcab = props?.route?.params?.Nearestcab;
  // const paymentMethod = props?.route?.params?.paymentMethod;
  // const fare = props?.route?.params?.fare;

  const token = useSelector(state => state.authReducer.token);
  const [additionalTime, setAdditionalTime] = useState(false);
  const {user_type} = useSelector(state => state.authReducer);
  const [start_waiting, setStartWaiting] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timePicker, setTimepicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  console.log('🚀 ~ RideScreen ~ currentPosition:', currentPosition);

  const destination = {
    latitude: parseFloat(data?.pickup_location_lat),
    longitude: parseFloat(data?.pickup_location_lng),
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

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
      console.error(error);
    }
  };

  const rideRquestCancel = async () => {
    const url = `auth/customer/ride_update/${rideId}`;
    setIsLoading(true);
    const response = await Post(url, {status: rideStatus}, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
    }
  };
  const handleConfirm = time => {
    setSelectedTime(time.toLocaleTimeString());
  };

  const [value, setValue] = useState({
    hours: 1,
    minutes: 0,
    seconds: 0,
  });

  const handleChange = newValue => {
    setValue(newValue);
  };

  useEffect(() => {
    const reigion = {
      latitude: currentPosition?.latitude,
      longitude: currentPosition?.longitude,
      latitudeDelta: 0.0522,
      longitudeDelta: 0.0521,
    };
    mapRef.current?.animateToRegion(reigion, 1000);
  }, [currentPosition]);

  return (
    <SafeAreaView style={styles.safe_are}>
      <Header
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
          provider={PROVIDER_GOOGLE}
          customMapStyle={customMapStyle}
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: currentPosition?.latitude || 24.859879,
            longitude: currentPosition?.longitude || 67.062703,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: 24.859879,
              longitude: 67.062703,
            }}
            pinColor={Color.red}
          />
          <Marker
            coordinate={{
              latitude: 24.9187994,
              longitude: 67.0636104,
            }}
            pinColor={Color.red}
          />
          <MapViewDirections
            origin={{
              latitude: 24.859879,
              longitude: 67.062703,
            }}
            destination={{
              latitude: 24.9187994,
              longitude: 67.0636104,
            }}
            strokeColor={Color.themeBlack}
            strokeWidth={10}
            apikey="YOUR_GOOGLE_MAPS_API_KEY"
          />
        </MapView>
        {user_type === 'Rider' && start_waiting === true ? (
          <>
            <CustomButton
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
            />
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
              <View
                style={[
                  styles.waiting_card,
                  {
                    height: windowHeight * 0.15,
                    bottom: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <CustomText isBold style={styles.time}>
                  01 : 59
                </CustomText>
              </View>
            ) : (
              <>
                {user_type === 'Customer' ? (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 80,
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
                          {/* {pickupLocation?.name} */}
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
                          {/* {dropoffLocation?.name} */}
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
                              setTimepicker(true);
                            }}
                            style={styles.text2}>
                            ADD ADDITIONAL TIME
                          </CustomText>
                        </TouchableOpacity>
                        <CustomText
                          onPress={() => {
                            rideRquestCancel();
                          }}
                          style={styles.text2}>
                          CANCEL RIDE
                        </CustomText>
                      </View>
                      <CustomButton
                        text={'PAY Now'}
                        fontSize={moderateScale(14, 0.3)}
                        textColor={Color.white}
                        borderRadius={moderateScale(30, 0.3)}
                        width={windowWidth * 0.85}
                        marginTop={moderateScale(10, 0.3)}
                        height={windowHeight * 0.07}
                        bgColor={Color.darkBlue}
                        textTransform={'capitalize'}
                        isBold
                        onPress={() =>
                          navigationService.navigate('PaymentScreen', {
                            Nearestcab: Nearestcab,
                            paymentMethod: paymentMethod,
                            fare: fare,
                          })
                        }
                      />
                      {user_type === 'Rider' && (
                        <CustomButton
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
                      )}
                    </View>
                    {user_type === 'Rider' && (
                      <CustomButton
                        text={'START WAITING'}
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
                        onPress={() => setStartWaiting(true)}
                      />
                    )}
                  </View>
                ) : (
                  <CustomButton
                    style={{
                      position: 'absolute',
                      bottom: 100,
                    }}
                    text={'Arrive'}
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
              </>
            )}
          </>
        )}
        {/* <TimePicker value={value} onChange={handleChange} />; */}
        {/* <View style={styles.container}>
          <DateTimePickerModal
            isDarkModeEnabled={true}

            // pickerComponentStyleIOS={{}}
            // timePickerModeAndroid="false"
            isVisible={timePicker}
            mode="time" // Use 'time' mode for time picking
            onConfirm={handleConfirm}
            // onCancel={hidePicker}
            customHeaderIOS={{
              backgroundColor : 'red'
            }}
            pickerComponentStyleIOS={{
              datePickerIOS: styles.pickerComponentStyleIOS, // Custom styles for iOS picker
              datePicker: styles.datePickerCommon, // Common styles for both platforms
              dateInput: styles.dateInput, // Optional input styling
            }}
            // onCancel={hideTimePicker}
          />
          {selectedTime && <Text>Selected Time: {selectedTime}</Text>}
        </View> */}
      </View>
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
