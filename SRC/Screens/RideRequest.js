import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import navigationService from '../navigationService';
import CustomButton from '../Components/CustomButton';
import PaymentMethodCard from '../Components/PaymentMethodCard';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';

const RideRequest = ({route}) => {
  const {type} = route.params;
  console.log('🚀 ~ RideRequest ~ type:', type);
  const token = useSelector(state => state.authReducer.token);
  const [additionalTime, setAdditionalTime] = useState(false);
  const [startNavigation, setStartnavigation] = useState(false);
  const [dropoff, setDropOff] = useState(false);
  const [done, setDone] = useState(false);
  const [arrive, setArrive] = useState(false);
  const [decline, setDecline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const origin = {latitude: 37.3285792, longitude: -122.0356209};
  const destination = {latitude: 37.3320305, longitude: -122.0355326};
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigationService.navigate('PaymentScreen');
  //   }, 3000);
  // }, []);

  const rideAcceptApi = async () => {
    const url = '';
    const body = {};
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
    }
  };

  const rideCancelApi = async () => {
    const url = '';
    const body = {};
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
    }
  };

  return (
    <SafeAreaView style={styles.safe_are}>
      <Header title={decline ? 'Cancel Ride' : 'Ride Request'} />
      <View style={styles.main_view}>
        <View style={[styles.map_view]}>
          <CustomImage
            source={require('../Assets/Images/map3.png')}
            styles={styles.image}
          />
        </View>
        {/* <MapView
          provider={PROVIDER_GOOGLE} 
          style={styles.map}
          region={{
            latitude: 37.3318456,
            longitude: -122.0296002,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker coordinate={origin} style={{width: 15, height: 10}} />
          <MapViewDirections
            origin={origin}
            destination={destination}
            strokeColor="blue"
            strokeWidth={10}
            apikey="AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc"
          />
          <Marker coordinate={destination} />
        </MapView> */}
        {type === 'fromIdentity' ? (
          <>
            {startNavigation ? (
              <>
                {dropoff ? (
                  <>
                    {arrive === true ? (
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 120,
                          alignSelf: 'center',
                        }}>
                        <PaymentMethodCard
                          isuserCard
                          name={'Theodora J. Gardner'}
                          image={require('../Assets/Images/user_image2.png')}
                          pickuplocation={'Fannie Street San Angelo, Texas'}
                          dropofflocation={'Neville Street Salem, Colorado'}
                          isButton
                          iscomplete
                          style={{marginBottom: moderateScale(20, 0.6)}}
                        />
                        <CustomButton
                          text={'End Trip'}
                          fontSize={moderateScale(14, 0.3)}
                          textColor={!done ? Color.black : Color.white}
                          borderRadius={moderateScale(30, 0.3)}
                          width={windowWidth * 0.9}
                          height={windowHeight * 0.075}
                          bgColor={!done ? Color.white : Color.darkBlue}
                          textTransform={'capitalize'}
                          elevation
                          isBold
                          borderWidth={1.5}
                          borderColor={Color.darkBlue}
                          marginBottom={moderateScale(10, 0.6)}
                          onPress={() =>
                            navigationService.navigate('RateScreen')
                          }
                        />
                      </View>
                    ) : (
                      <>
                        {!done && (
                          <CustomButton
                            text={'DONE'}
                            fontSize={moderateScale(14, 0.3)}
                            textColor={Color.white}
                            borderRadius={moderateScale(30, 0.3)}
                            width={windowWidth * 0.9}
                            height={windowHeight * 0.075}
                            bgColor={Color.darkBlue}
                            textTransform={'capitalize'}
                            elevation
                            isBold
                            onPress={() => setDone(true)}
                            // onPress={() =>
                            //   navigationService.navigate('PassengerDetails', {
                            //     type: '',
                            //   })
                            // }
                          />
                        )}
                        <CustomButton
                          text={!done ? 'Start' : 'Arrive'}
                          fontSize={moderateScale(14, 0.3)}
                          textColor={!done ? Color.black : Color.white}
                          borderRadius={moderateScale(30, 0.3)}
                          width={windowWidth * 0.9}
                          height={windowHeight * 0.075}
                          bgColor={!done ? Color.white : Color.darkBlue}
                          textTransform={'capitalize'}
                          elevation
                          isBold
                          marginTop={
                            !done
                              ? moderateScale(10, 0.6)
                              : moderateScale(40, 0.6)
                          }
                          onPress={() => {
                            if (done === true) {
                              setArrive(true);
                            } else {
                              setDropOff(true);
                            }
                          }}
                          borderWidth={1.5}
                          borderColor={Color.darkBlue}
                          // onPress={() =>
                          //   navigationService.navigate('PassengerDetails', {
                          //     type: '',
                          //   })
                          // }
                        />
                      </>
                    )}
                  </>
                ) : (
                  <CustomButton
                    text={'DROP-OFF'}
                    fontSize={moderateScale(14, 0.3)}
                    textColor={Color.white}
                    borderRadius={moderateScale(30, 0.3)}
                    width={windowWidth * 0.9}
                    height={windowHeight * 0.075}
                    bgColor={Color.darkBlue}
                    textTransform={'capitalize'}
                    elevation
                    isBold
                    marginTop={moderateScale(50, 0.6)}
                    onPress={() => setDropOff(true)}
                    // onPress={() =>
                    //   navigationService.navigate('PassengerDetails', {
                    //     type: '',
                    //   })
                    // }
                  />
                )}
              </>
            ) : (
              <>
                <CustomButton
                  text={'START NAVIGATION'}
                  fontSize={moderateScale(14, 0.3)}
                  textColor={Color.white}
                  borderRadius={moderateScale(30, 0.3)}
                  width={windowWidth * 0.9}
                  height={windowHeight * 0.075}
                  bgColor={Color.darkBlue}
                  textTransform={'capitalize'}
                  elevation
                  isBold
                  onPress={() => setStartnavigation(true)}
                  // onPress={() =>
                  //   navigationService.navigate('PassengerDetails', {
                  //     type: '',
                  //   })
                  // }
                />
                <CustomButton
                  text={'Traffic Update'}
                  fontSize={moderateScale(14, 0.3)}
                  textColor={Color.black}
                  borderRadius={moderateScale(30, 0.3)}
                  width={windowWidth * 0.9}
                  height={windowHeight * 0.075}
                  bgColor={Color.white}
                  textTransform={'capitalize'}
                  elevation
                  borderWidth={1.5}
                  borderColor={Color.darkBlue}
                  marginTop={moderateScale(10, 0.6)}
                  isBold
                  // onPress={() =>
                  //   navigationService.navigate('PassengerDetails', {
                  //     type: '',
                  //   })
                  // }
                />
              </>
            )}
          </>
        ) : (
          <View
            style={{
              position: 'absolute',
              bottom: 70,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <View style={styles.profile_view}>
              <View style={styles.image_view}>
                <CustomImage
                  style={styles.image}
                  source={require('../Assets/Images/user_image4.png')}
                />
              </View>
              <View style={{width: '80%'}}>
                <CustomText style={styles.name}>Timothy L. Brown</CustomText>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <CustomText style={styles.model} isBold>
                    Taxi Model :
                  </CustomText>
                  <CustomText style={styles.model}>
                    Toyata Vios (CO21DJ3684)
                  </CustomText>
                </View>
                <CustomText style={styles.model}>(4.5)</CustomText>
              </View>
            </View>
            <View style={styles.waiting_card}>
              <View style={styles.seatView}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: moderateScale(5, 0.6),
                    }}>
                    <Icon
                      name="clock-o"
                      as={FontAwesome}
                      size={moderateScale(16, 0.6)}
                      color={Color.darkBlue}
                    />
                    <View style={{alignItems: 'flex-start'}}>
                      <CustomText style={[styles.text1]}>
                        {'284 Long Street Gainesville'}
                      </CustomText>
                      <CustomText isBold style={styles.text1}>
                        {'B456B Hilton Road, N9 Bristol United Kingdom'}
                      </CustomText>
                    </View>
                  </View>
                  <CustomText
                    isBold
                    style={[
                      styles.text1,
                      {
                        position: 'absolute',
                        color: Color.veryLightGray,
                        top: 30,
                        marginLeft: moderateScale(-8, 0.6),
                        transform: [{rotate: '-90deg'}],
                      },
                    ]}>
                    ------
                  </CustomText>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: moderateScale(10, 0.6),
                    }}>
                    <Icon
                      name="map-marker"
                      as={FontAwesome}
                      size={moderateScale(16, 0.6)}
                      color={Color.darkBlue}
                    />
                    <View style={{alignItems: 'flex-start'}}>
                      <CustomText style={styles.text1}>
                        {'PickUpLocation'}
                      </CustomText>
                      <CustomText isBold style={styles.text1}>
                        {'B456B Hilton Road, N9 Bristol United Kingdom'}
                      </CustomText>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {decline === true ? (
              <CustomButton
                text={'Decline'}
                fontSize={moderateScale(14, 0.3)}
                textColor={Color.white}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.9}
                height={windowHeight * 0.075}
                bgColor={Color.darkBlue}
                textTransform={'capitalize'}
                elevation
                marginBottom={moderateScale(40, 0.6)}
                onPress={() =>
                  navigationService.navigate('ChooseDeclineReasonScreen')
                }
              />
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: moderateScale(20, 0.6),
                }}>
                <CustomButton
                  text={'Accept'}
                  fontSize={moderateScale(14, 0.3)}
                  textColor={Color.white}
                  borderRadius={moderateScale(30, 0.3)}
                  width={windowWidth * 0.7}
                  height={windowHeight * 0.075}
                  bgColor={Color.darkBlue}
                  textTransform={'capitalize'}
                  elevation
                  onPress={() =>
                    navigationService.navigate('PassengerDetails', {
                      type: '',
                    })
                  }
                />
                <TouchableOpacity
                  onPress={() => setDecline(true)}
                  style={styles.icon_view}>
                  <Icon
                    name="cross"
                    as={Entypo}
                    size={moderateScale(24, 0.6)}
                    color={Color.white}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default RideRequest;

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
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  seatView: {
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(12, 0.6),
    flexDirection: 'row',
  },
  text1: {
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
  },
  waiting_card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
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
    bottom: 20,
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
  profile_view: {
    width: windowWidth * 0.89,
    height: windowHeight * 0.1,
    borderRadius: windowWidth,
    marginTop: moderateScale(15, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: Color.darkBlue,
    alignSelf: 'center',
    marginBottom: moderateScale(50, 0),
  },
  image_view: {
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
    borderRadius: windowHeight,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.grey,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: moderateScale(13, 0.6),
    color: Color.white,
  },
  model: {
    fontSize: moderateScale(11, 0.6),
    color: Color.white,
  },
  icon_view: {
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
    backgroundColor: Color.red,
    borderRadius: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: moderateScale(20, 0.6),
  },
});
