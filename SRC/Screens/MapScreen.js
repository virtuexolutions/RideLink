import database from '@react-native-firebase/database';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {isValidCoordinate} from 'geolib';
import LottieView from 'lottie-react-native';
import {Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Pulse from 'react-native-pulse';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CancelRide from '../Components/CancelRide';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import DeclineModal from '../Components/DeclineModal';
import RequestModal from '../Components/RequestModal';
import navigationService from '../navigationService';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';

const MapScreen = props => {
  const ridedata = props?.route?.params?.ridedata;
  console.log(
    '🚀 ~ ridedata======================================== >>:',
    ridedata,
  );
  const fromDelivery = props?.route?.params?.fromDelivery;
  const paymentMethod = props?.route?.params?.paymentMethod;
  const delivery_Id = props?.route?.params?.delivery_Id;
  const nearestcab = props?.route?.params?.isEnabled;

  const token = useSelector(state => state.authReducer.token);
  const mapRef = useRef();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rideId, setRideID] = useState('');
  const [rideStatus, setRideStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState('');
  const [rideupdatedData, setRideuptedData] = useState(true);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getCurrentLocation();
  }, [isFocused]);

  useEffect(() => {
    if (isValidCoordinate(currentPosition)) {
      mapRef.current?.animateToRegion(
        {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        },
        1000,
      );
    }
  }, [currentPosition]);

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

  const requestforRide = async () => {
    console.log('========================= >>>>>>>>>>>>>>>>>>');
    const formData = new FormData();
    const body = {
      location_from: ridedata?.pickupLocation?.name,
      location_to: ridedata?.dropoffLocation?.name,
      dropoff_location_lat: ridedata?.dropoffLocation?.lat,
      dropoff_location_lng: ridedata?.dropoffLocation?.lng,
      pickup_location_lat: ridedata?.pickupLocation?.lat,
      pickup_location_lng: ridedata?.pickupLocation?.lng,
      amount: ridedata?.fare,
      payment_method: paymentMethod,
      nearest_cab: nearestcab,
      distance: ridedata?.distance,
      cab_type: JSON.stringify(ridedata?.cabtype, null, 2),
      time: ridedata?.time,
      category: ridedata?.data?.title,
      type: ridedata?.data?.title,
    };

    ridedata?.multiplePickups?.forEach((item, index) => {
      formData.append(`pickup[${index}][lat]`, item?.lat);
      formData.append(`pickup[${index}][lng]`, item?.lng);
    });
    for (let key in body) {
      formData.append(key, body[key]);
    }

    console.log(
      '🚀 ~ requestforRide ~ response================ >>>>>:',
      JSON.stringify(formData, null, 2),
    );
    const url = 'auth/bookride';
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      setRideID(response?.data?.data?.ride_info?.ride_id);
      setRideStatus(response?.data.data?.ride_info?.status);
      setIsModalVisible(true);
    }
  };

  useEffect(() => {
    const reference = database().ref(
      `/requests/${fromDelivery ? delivery_Id : rideId}`,
    );
    const listener = reference.on('value', snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        if (data?.ride_info?.status && data?.ride_info?.status !== 'pending') {
          setRideuptedData(data);
          setModalVisible(true);
        }
      }
    });

    return () => reference.off('value', listener);
  }, [fromDelivery ? delivery_Id : rideId]);

  return (
    <SafeAreaView style={[styles.safe_are, styles.background_view]}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: currentPosition.latitude || 0,
          longitude: currentPosition.longitude || 0,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        }}></MapView>
      <Pulse
        color={Color.black}
        numPulses={3}
        diameter={400}
        speed={20}
        duration={2000}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <View style={styles.circle}>
        <Icon
          name="map-marker-alt"
          as={FontAwesome5}
          size={moderateScale(30, 0.6)}
          color={Color.white}
          style={{left: 5}}
        />
      </View>
      <View style={{position: 'absolute', bottom: 20}}>
        {!fromDelivery && !isModalVisible && (
          <CustomButton
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            bgColor={Color.themeBlack}
            borderRadius={moderateScale(30, 0.3)}
            textColor={Color.white}
            textTransform={'none'}
            text={
              isLoading ? (
                <ActivityIndicator size={'small'} color={Color.white} />
              ) : (
                'Request'
              )
            }
            isBold
            onPress={() => {
              requestforRide();
            }}
          />
        )}
      </View>
      {(fromDelivery || isModalVisible) && (
        <View style={styles.waiting_main_view}>
          <View style={styles.waiting_sub_view}>
            <View style={styles.animation_view}>
              <LottieView
                autoPlay
                loop
                style={styles.waiting_animation}
                source={require('../Assets/Images/cabanimation.json')}
              />
            </View>

            <CustomText isBold style={{fontSize: moderateScale(15, 0.6)}}>
              Waiting Rider to Accept Your Ride
            </CustomText>
          </View>
        </View>
      )}

      <RequestModal
        isVisible={modalVisible}
        onPressDecline={() => {
          setModalVisible(false);
          setDeclineModal(true);
        }}
        data={rideupdatedData}
        onPressAccept={() =>
          navigationService.navigate('TrackingScreen', {
            data: rideupdatedData,
            type: '',
          })
        }
      />
      <DeclineModal
        isVisible={declineModal}
        onBackdropPress={() => setDeclineModal(false)}
        onpressAccept={() => navigation.goBack()}
        onPressCancel={() => navigationService.navigate('Home')}
      />
      <CancelRide modalVisible={isVisible} setModalVisible={setIsVisible} />
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  safe_are: {
    width: windowWidth,
    height: windowHeight,
  },
  background_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
    paddingVertical: moderateScale(20, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    backgroundColor: Color.black,
    borderRadius: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Color.white,
  },
  offer_view: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
    color: Color.black,
    paddingVertical: moderateScale(6, 0.6),
    width: '80%',
    borderBottomWidth: 0.8,
    borderBottomColor: '#D8D8D8',
  },
  payment_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12, 0.6),
    marginTop: moderateScale(10, 0.6),
  },
  icon_view: {
    width: moderateScale(25, 0.6),
    height: moderateScale(25, 0.6),
    backgroundColor: Color.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: windowWidth,
  },
  price: {
    width: '70%',
    fontSize: moderateScale(20, 0.6),
    textAlign: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.grey,
  },
  waiting_main_view: {
    width: windowWidth,
    height: windowHeight * 0.22,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
  },
  waiting_sub_view: {
    backgroundColor: Color.white,
    width: windowWidth * 0.9,
    height: windowHeight * 0.19,
    alignSelf: 'center',
    borderRadius: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(20, 0.7),
    paddingVertical: moderateScale(10, 0.6),
    alignItems: 'center',
  },
  animation_view: {
    width: moderateScale(100, 0.6),
    height: moderateScale(100, 0.6),
    marginTop: moderateScale(5, 0.6),
  },
  waiting_animation: {
    height: '100%',
    width: '1000%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
