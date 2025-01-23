import {useIsFocused} from '@react-navigation/native';
import {ScrollView} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  I18nManager,
  ImageBackground,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import {moderateScale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import DeliveryBox from '../Components/DeliveryBox';
import Header from '../Components/Header';
import SearchbarComponent from '../Components/SearchbarComponent';
import Userbox from '../Components/Userbox';
import navigationService from '../navigationService';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {getDatabase, onChildAdded, ref} from '@react-native-firebase/database';

const Home = () => {
  const token = useSelector(state => state.authReducer.token);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [activebutton, setactivebutton] = useState('current');
  const {user_type} = useSelector(state => state.authReducer);
  console.log('🚀 ~ Homeeeeee ~ toksen:', token, user_type);
  const [isLoading, setIsLoading] = useState(false);
  const [requestList, setRequestList] = useState([]);
  const [modal_visible, setModalVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [historyLoading, setHistoryLoading] = useState(false);
  const [histry_list, setHistoryList] = useState([]);
  const deliveryList = [
    {
      id: 1,
      image: require('../Assets/Images/carimage.png'),
      title: 'Ride',
    },
    {
      id: 2,
      image: require('../Assets/Images/parcelimage.png'),
      title: 'Parcel Delivery',
    },
    {
      id: 3,
      image: require('../Assets/Images/catimage.png'),
      title: 'Pets',
    },
  ];
  const userBox = [
    {
      id: 1,
      image: require('../Assets/Images/headerPhoto.png'),
      userID: 'Y3I4USQ2',
      subtext: 'Natalya Undergrowth',
      time: '07:30am',
      fromLocation: 'Mississippi, Jackson',
      toLocation: 'New Hampshire, Manchester',
    },
    {
      id: 2,
      image: require('../Assets/Images/headerPhoto.png'),
      userID: 'Y3I4USQ2',
      subtext: 'Natalya Undergrowth',
      time: '07:30am',
      fromLocation: 'Mississippi, Jackson',
      toLocation: 'New Hampshire, Manchester',
    },
  ];

  const user_list = [
    {
      amount: 13,
      created_at: '2025-01-15T14:02:21.000000Z',
      date: null,
      distance: 0.13294250476869293,
      dropoff_location_lat: '24.8615147',
      dropoff_location_lng: '67.0617251',
      id: 227,
      location_from: 'Azizabad Block 8 Gulberg Town, Karachi, Pakistan',
      location_to:
        'Nursery Pakistan Employees Co-Operative Housing Society, Karachi, Pakistan',
      nearest_cab: '0',
      payment_method: 'Card',
      pickup_location_lat: '24.9207427',
      pickup_location_lng: '67.0665656',
      rider_id: null,
      status: 'pending',
      stops: null,
      time: null,
      updated_at: '2025-01-15T14:02:21.000000Z',
      user: ['Object'],
      user_id: 5,
    },
  ];

  useEffect(() => {
    if (user_type === 'Rider') {
      getCurrentLocation();
    }
  }, []);

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

  const rideRequestList = async () => {
    const url = 'auth/rider/ride-request-list ';
    setIsLoading(true);
    const response = await Get(url, token);
    console.log(
      '🚀 ~ rideRequestList ~ resssponse:',
      response?.data?.ride_info,
    );
    setIsLoading(false);
    if (response != undefined) {
      setRequestList(response?.data?.ride_info);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const requestsRef = ref(db, 'requests');
    const unsubscribe = onChildAdded(requestsRef, snapshot => {
      console.log('New request added:', snapshot.val());
      rideRequestList();
    });
    return () => unsubscribe();
  }, [isFocused]);

  // useEffect(() => {
  //   async function GetPermission() {
  //     // if(PermissionsAndroid.PERMISSIONS.)
  //     await requestLocationPermission();
  //     await requestCameraPermission();
  //     await requestWritePermission();
  //   }
  //   GetPermission();
  // }, []);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     rideRequestList();
  //   }, 10000);

  //   return () => clearTimeout(timeout);
  // }, []);

  useEffect(() => {
    if (user_type === 'Rider') {
      updateLocation();
    }
    userRequestHistory();
  }, [currentPosition]);

  const updateLocation = async () => {
    const url = 'auth/rider/update-location';
    const body = {
      lat: currentPosition?.latitude,
      lng: currentPosition?.longitude,
    };
    const response = await Post(url, body, apiHeader(token));
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('You are online now', ToastAndroid.SHORT)
        : Alert.alert('You are online now');
    }
  };

  const userRequestHistory = async () => {
    const url = `auth/customer/ride_list?type=${activebutton}`;
    setHistoryLoading(truee);
    const response = await Get(url, token);
    console.log('🚀 ~ userRequestHistory ~ response:', response?.data);
    setHistoryLoading(false);
    if (response != undefined) {
      setHistoryList(response?.data);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // rideRequestList()
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.safe_area}>
      <Header title={user_type === 'Rider' ? 'Driver Online' : ''} />
      <SearchbarComponent
        SearchStyle={{
          width: windowWidth * 0.9,
          height: windowHeight * 0.058,
          backgroundColor: Color.white,
        }}
        placeholderName={null}
        isRightIcon={true}
        name={'search'}
        as={Feather}
        color={Color.grey}
      />
      <View style={styles.main_Container}>
        <View style={styles.ridelink_Box}>
          <ImageBackground
            style={styles.link_Image}
            imageStyle={{
              height: '100%',
              width: '100%',
              // borderRadius: moderateScale(17, 0.6),
            }}
            source={require('../Assets/Images/bgcimage.png')}>
            <View
              style={{
                flexDirection: 'row',
                height: '100%',
                alignItems: 'center',
              }}>
              <View
                style={{
                  marginTop: windowHeight * 0.12,
                  paddingLeft: moderateScale(10, 0.6),
                }}>
                <CustomText
                  style={{
                    fontSize: moderateScale(10, 0.6),
                    color: Color.themeBlack,
                    width: windowWidth * 0.42,
                  }}>
                  Request A Ride, Hop In, And Go.
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(24, 0.6),
                    color: Color.themeBlack,
                    width: windowWidth * 0.45,
                    fontWeight: 'bold',
                  }}>
                  Go Anywhere With Ridelynk
                </CustomText>
              </View>
              {user_type === 'Rider' ? (
                <CustomButton
                  text={'Explore'}
                  fontSize={moderateScale(14, 0.3)}
                  textColor={Color.btn_Color}
                  borderRadius={moderateScale(30, 0.3)}
                  width={windowWidth * 0.3}
                  //   marginTop={moderateScale(10,.3)}
                  height={windowHeight * 0.05}
                  bgColor={Color.lightGrey}
                  textTransform={'capitalize'}
                  borderWidth={1}
                  style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 10,
                  }}
                />
              ) : (
                <View style={styles.second_Image}>
                  <CustomImage
                    style={{height: '100%', width: '100%'}}
                    source={require('../Assets/Images/ridelink.png')}
                  />
                </View>
              )}
            </View>
          </ImageBackground>
        </View>

        {user_type === 'Rider' ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}>
            {isLoading ? (
              <ActivityIndicator
                style={styles.indicatorStyle}
                size="small"
                color={Color.black}
              />
            ) : (
              <FlatList
                ListEmptyComponent={
                  <CustomText
                    style={{
                      textAlign: 'center',
                      fontSize: moderateScale(11, 0.6),
                      color: Color.red,
                    }}>
                    no data found
                  </CustomText>
                }
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item?.id}
                data={requestList}
                contentContainerStyle={{marginBottom: moderateScale(100, 0.6)}}
                style={{marginBottom: moderateScale(20, 0.6)}}
                renderItem={({item}) => {
                  return (
                    <Userbox
                      data={item}
                      onPressDetails={() =>
                        navigationService.navigate('RideRequest', {
                          type: '',
                          data: item,
                        })
                      }
                    />
                  );
                }}
              />
            )}
          </ScrollView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={deliveryList}
                style={styles.container_Style}
                contentContainerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                renderItem={({item}) => {
                  return <DeliveryBox data={item} />;
                }}
              />
            </View>
            <View style={styles.button_Box}>
              <CustomButton
                onPress={() => {
                  setactivebutton('current');
                }}
                text={'Current '}
                fontSize={moderateScale(14, 0.3)}
                textColor={
                  activebutton === 'current' ? Color.white : Color.btn_Color
                }
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.42}
                //   marginTop={moderateScale(10,.3)}
                height={windowHeight * 0.053}
                bgColor={
                  activebutton === 'current' ? Color.btn_Color : 'transparent'
                }
                textTransform={'capitalize'}
              />
              <CustomButton
                onPress={() => {
                  setactivebutton('history');
                }}
                text={'History'}
                fontSize={moderateScale(14, 0.3)}
                textColor={
                  activebutton === 'history' ? Color.white : Color.btn_Color
                }
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.42}
                //   marginTop={moderateScale(10,.3)}
                height={windowHeight * 0.055}
                bgColor={
                  activebutton === 'history' ? Color.btn_Color : 'transparent'
                }
                textTransform={'capitalize'}
              />
            </View>
            {historyLoading ? (
              <ActivityIndicator
                style={styles.indicatorStyle}
                size="small"
                color={Color.black}
              />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <CustomText
                    style={{
                      textAlign: 'center',
                      fontSize: moderateScale(11, 0.6),
                      color: Color.red,
                    }}>
                    no data found
                  </CustomText>
                }
                style={{paddingBottom: moderateScale(150, 0.6)}}
                contentContainerStyle={{gap: moderateScale(10, 0.6)}}
                data={histry_list}
                renderItem={({item}) => {
                  return (
                    <Userbox
                      data={item}
                      // onPress={}
                    />
                  );
                }}
              />
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safe_area: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
  },
  indicatorStyle: {
    paddingRight: 5,
    paddingLeft: I18nManager.isRTL ? 5 : 0,
    marginTop: moderateScale(20, 0.6),
  },
  main_Container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    // backgroundColor : 'red' ,
  },
  ridelink_Box: {
    width: windowWidth * 0.88,
    height: windowHeight * 0.25,
    alignSelf: 'center',
    borderRadius: moderateScale(17, 0.6),
    borderWidth: 1,
    borderColor: Color.boxgrey,
    marginVertical: moderateScale(10, 0.6),
  },
  link_Image: {
    width: windowWidth * 0.88,
    height: '100%',
    // borderRadius: moderateScale(17, 0.6),
    alignSelf: 'center',
  },
  second_Image: {
    height: windowHeight * 0.32,
    width: windowWidth * 0.52,
    right: moderateScale(25, 0.6),
    top: moderateScale(15, 0.6),
  },
  container_Style: {
    paddingVertical: moderateScale(40, 0.6),
  },
  button_Box: {
    width: windowWidth * 0.88,
    height: moderateScale(50, 0.6),
    borderWidth: 1,
    borderRadius: moderateScale(30, 0.6),
    borderColor: Color.boxgrey,
    bottom: moderateScale(20, 0.6),
    flexDirection: 'row',
    gap: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(5, 0.6),
    backgroundColor: Color.lightGrey,
    // backgroundColor:'green',
    // position:'absolute'
  },
  card: {
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
    backgroundColor: Color.white,
    alignSelf: 'center',
  },
  image_view: {
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
    borderRadius: windowHeight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text_view: {
    width: '60%',
  },
  icon_view: {
    width: moderateScale(40, 0.6),
    height: moderateScale(40, 0.6),
    backgroundColor: Color.black,
    borderRadius: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(14, 0.6),
    color: Color.black,
  },
  location: {
    fontSize: moderateScale(12, 0.6),
    color: Color.grey,
  },
  date: {
    fontSize: moderateScale(11, 0.6),
    color: Color.veryLightGray,
  },
});
