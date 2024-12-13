import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Pulse from 'react-native-pulse';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AskLocation from '../Components/AskLocation';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import RequestModal from '../Components/RequestModal';
import DeclineModal from '../Components/DeclineModal';
import navigationService from '../navigationService';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';

const MapScreen = props => {
  const pickupLocation = props?.route?.params?.pickupLocation;
  const dropoffLocation = props?.route?.params?.dropoffLocation;
  const Nearestcab = props?.route?.params?.isEnabled;
  const paymentMethod = props?.route?.params?.paymentMethod;
  const fare = props?.route?.params?.fare;
  const distance = props?.route?.params?.distance;

  const token = useSelector(state => state.authReducer.token);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [price, setPrice] = useState(fare);
  const [modalVisible, setModalVisible] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rideId, setRideID] = useState('');
  const [rideStatus, setRideStatus] = useState('');
  

  const requestforRide = async () => {
    const url = 'auth/bookride';
    const body = {
      location_from: pickupLocation?.name,
      location_to: dropoffLocation?.name,
      dropoff_location_lat: dropoffLocation?.lat,
      dropoff_location_lng: dropoffLocation?.lng,
      pickup_location_lat: pickupLocation?.lat,
      pickup_location_lng: pickupLocation?.lng,
      distance: distance,
      amount: fare,
      payment_method: paymentMethod,
      nearest_cab: Nearestcab,
    };
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    console.log('responseeeeeeeeeeeeeee ', response?.data.data?.id);

    if (response != undefined) {
      setRideID(response?.data.data?.id);
    }
  };

  const rideUpdate = async () => {
    const url = `auth/ride/${rideId}`;
    const response = await Get(url, token);
     console.log(
      '🚀 ~ rideUpdate ~ response =====================:',
      response?.data,
    );
    if (response != undefined) {
      response?.data?.ride_info?.status == 'pending' && setModalVisible(true);
      setRideStatus(response?.data?.ride_info?.status);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      rideId != '' && rideUpdate();
    }, 5000);
    return () => clearInterval(interval);
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safe_are}>
      <ImageBackground
        style={styles.background_view}
        source={require('../Assets/Images/map2.png')}>
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
          <AskLocation
            main_view_style={{height: windowHeight * 0.17}}
            heading={'Waiting For Replies'}
            renderView={
              <View style={styles.offer_view}>
                <CustomText style={styles.text}>Your Offer</CustomText>
                <View style={styles.payment_view}>
                  <TouchableOpacity
                    onPress={() => setPrice(price - 5)}
                    style={styles.icon_view}>
                    <Icon
                      name="minus"
                      as={FontAwesome5}
                      color={Color.white}
                      size={moderateScale(10, 0.6)}
                    />
                  </TouchableOpacity>
                  <CustomText isBold style={styles.price}>
                    {'$'} {price}
                  </CustomText>
                  <TouchableOpacity
                    onPress={() => setPrice(price + 5)}
                    style={styles.icon_view}>
                    <Icon
                      name="plus"
                      as={FontAwesome5}
                      color={Color.white}
                      size={moderateScale(10, 0.6)}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            }
          />
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
                'RAISE FARE'
              )
            }
            isBold
            onPress={() => {
              // rideUpdate()
              requestforRide();
              // setModalVisible(true)
            }}
          />
        </View>
        <RequestModal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onPressDecline={() => {
            setModalVisible(false);
            setDeclineModal(true);
          }}
          onPressAccept={() =>
            navigationService.navigate('RideScreen', {
              rideStatus: rideStatus,
              rideId: rideId,
              pickupLocation: pickupLocation,
              dropoffLocation: dropoffLocation,
              Nearestcab: Nearestcab,
              paymentMethod: paymentMethod,
              fare: fare,
            })
          }
        />
        <DeclineModal
          isVisible={declineModal}
          onBackdropPress={() => setDeclineModal(false)}
          onpressAccept={() => navigation.goBack()}
          onPressCancel={() => navigationService.navigate('Home')}
        />
      </ImageBackground>
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
});
