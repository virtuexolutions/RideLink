import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Pusher} from '@pusher/pusher-websocket-react-native';
import {isValidCoordinate} from 'geolib';
import MapViewDirections from 'react-native-maps-directions';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import {customMapStyle} from '../Utillity/mapstyle';
import {windowHeight, windowWidth} from '../Utillity/utils';

const TrackingScreen = props => {
  const ridedata = props?.route?.params?.data;
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);

  const mapRef = useRef(null);
  const pusher = Pusher.getInstance();
  const myChannel = useRef(null);
  const isFocused = useIsFocused();

  const [isRouteFitted, setIsRouteFitted] = useState(false);
  const [riderStatus, setRiderStatus] = useState('');
  const [origin, setOrigin] = useState({
    latitude: parseFloat(ridedata?.ride_info?.rider?.lat),
    longitude: parseFloat(ridedata?.ride_info?.rider?.lng),
  });
  const destination = {
    latitude: parseFloat(ridedata?.ride_info?.pickup_location_lat),
    longitude: parseFloat(ridedata?.ride_info?.pickup_location_lng),
  };
  const waypoints = [ridedata?.ride_info?.pickup];
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

  useEffect(() => {
    const connectPusher = async () => {
      try {
        console.log('Initializing Pusher...');
        await pusher.init({
          apiKey: '2cbabf5fca8e6316ecfe',
          cluster: 'ap2',
          encrypted: true,
        });

        await pusher.connect();
        console.log('Pusher Connected!');
        myChannel.current = await pusher.subscribe({
          channelName: `my-ride-location-${ridedata?.ride_info?.user?.id}`,
          onSubscriptionSucceeded: channelName => {
            console.log(`Subscribed to ${channelName}`);
          },
          onEvent: event => {
            console.log('Received Event =====================>>:', event);
            try {
              const dataString = JSON.parse(event.data);
              if (dataString?.message) {
                setOrigin({
                  latitude: parseFloat(dataString?.message?.lat),
                  longitude: parseFloat(dataString?.message?.lng),
                });
              }

              console.log('Pusher Connection State:', pusher.connectionState);
            } catch (error) {
              console.error('Error parsing event data:', error);
            }
          },
        });
      } catch (error) {
        console.error('Pusher Connection Error:', error);
      }
    };

    connectPusher();

    return () => {
      if (myChannel.current) {
        pusher.unsubscribe({
          channelName: `my-ride-location-${ridedata?.ride_info?.user?.id}`,
        });
      }
    };
  }, [isFocused]);
  const apikey = 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8';
  // useEffect(() => {
  // //   const watchId = Geolocation.watchPosition(
  // //     position => {
  // //       const {latitude, longitude} = position.coords;
  // //       setCurrentPosition(prevLocation => ({
  // //         ...prevLocation,
  // //         latitude,
  // //         longitude,
  // //       }));
  // //       const isLocationClose = (lat1, lon1, lat2, lon2, threshold = 0.0001) =>
  // //         Math.abs(lat1 - lat2) < threshold &&
  // //         Math.abs(lon1 - lon2) < threshold;
  // //       // if (
  // //       //   isLocationClose(
  // //       //     37.4219983,
  // //       //     -122.084,
  // //       //     37.43312021060092,
  // //       //     -122.08768555488422,
  // //       //   )
  // //       // ) {
  // //       if (
  // //         isLocationClose(
  // //           // latitude,
  // //           24.8612199,
  // //           destination?.lat,
  // //           // longitude,
  // //           67.0695211,
  // //           destination?.lng,
  // //         )
  // //       ) {
  // //         console.log(
  // //           'location same eeeeeeeeeeeeeeeeeeeeeeeeee',
  // //           24.8612199,
  // //           destination?.lat,
  // //           67.0695211,
  // //           destination?.lng,
  // //         );
  // //         setIsRiderArrived(true);
  // //       }
  // //     },
  // //     error => console.log('Error getting location:', error),
  // //     {
  // //       enableHighAccuracy: true,
  // //       distanceFilter: 1,
  // //       interval: 1000,
  // //     },
  // //   );
  // //   return () => {
  // //     Geolocation.clearWatch(watchId);
  // //   };
  // // }, [isFocused]);

  // // useEffect(() => {
  // //   const reference = database().ref(
  // //     `/requests/${ridedata?.ride_info?.ride_id}`,
  // //   );
  // //   const listener = reference.on('value', snapshot => {
  // //     if (snapshot.exists()) {
  // //       const data = snapshot.val();
  // //       if (data?.ride_info) {
  // //         setRiderStatus(data?.ride_info?.status);
  // //       }
  // //     }
  // //   });

  // //   return () => reference.off('value', listener);
  // // }, [ridedata?.ride_info?.ride_id]);

  return (
    // <SafeAreaView style={[styles.safe_are, styles.background_view]}>
    //   <View
    //     style={{
    //       paddingTop: moderateScale(10, 0.6),
    //     }}>
    //     <Header showBack={true} title={''} />
    //   </View>
    //   <View style={styles.main_view}>
    //     <MapView
    //       customMapStyle={customMapStyle}
    //       ref={mapRef}
    //       provider={PROVIDER_GOOGLE}
    //       style={styles.map}
    //       initialRegion={{
    //         latitude: parseFloat(currentPosition.latitude),
    //         longitude: parseFloat(currentPosition.longitude),
    //         latitudeDelta: 0.0522,
    //         longitudeDelta: 0.0525,
    //       }}
    //       onReady={result => {
    //         if (mapRef.current && !isRouteFitted) {
    //           mapRef.current.fitToCoordinates(result.coordinates, {
    //             edgePadding: {
    //               right: 50,
    //               left: 50,
    //               top: 300,
    //               bottom: 100,
    //             },
    //           });
    //           setIsRouteFitted(true);
    //         }
    //       }}>
    //

    //

    //       {/* {riderStatus === 'riderArrived' && (
    //       <View key="riderArrivedView" style={styles.waiting_main_view}>
    //         <View style={styles.waiting_sub_view}>
    //           <View style={styles.animation_view}>
    //             <LottieView
    //               key="riderArrivedLottie" // force remount
    //               autoPlay
    //               loop
    //               style={styles.waiting_animation}
    //               source={require('../Assets/Images/cab_arrived_animation.json')}
    //             />
    //           </View>
    //           <CustomText isBold style={{fontSize: moderateScale(15, 0.6)}}>
    //             Your rider has arrived
    //           </CustomText>
    //         </View>
    //       </View>
    //     )} */}
    //     </MapView>
    //     <View
    //       style={[
    //         styles.latest_ride_view,
    //         {
    //           top: 40,
    //         },
    //       ]}>
    //       <View style={styles.latest_ride_subView}>
    //         <View style={styles.latest_ride_image_view}>
    //           <CustomImage
    //             source={require('../Assets/Images/user.png')}
    //             style={{
    //               width: '100%',
    //               height: '100%',
    //               borderRadius: windowWidth,
    //             }}
    //           />
    //         </View>
    //         <View
    //           style={{
    //             marginLeft: moderateScale(10, 0.6),
    //             width: windowWidth * 0.5,
    //           }}>
    //           <CustomText
    //             isBold
    //             style={{
    //               fontSize: moderateScale(13, 0.6),
    //               color: Color.black,
    //             }}>
    //             {ridedata?.ride_info?.rider?.name}
    //           </CustomText>
    //           <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //             <CustomText
    //               isBold
    //               style={{
    //                 fontSize: moderateScale(11, 0.6),
    //                 color: Color.black,
    //               }}>
    //               status :
    //             </CustomText>
    //             <CustomText
    //               style={{
    //                 fontSize: moderateScale(11, 0.6),
    //                 color: Color.veryLightGray,
    //                 marginLeft: moderateScale(8, 0.6),
    //               }}>
    //               {ridedata?.ride_info?.status}
    //             </CustomText>
    //           </View>
    //         </View>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             width: windowWidth * 0.2,
    //             height: '100%',
    //             paddingTop: moderateScale(10, 0.6),
    //             paddingHorizontal: moderateScale(15, 0.6),
    //             justifyContent: 'space-between',
    //           }}>
    //           <Icon
    //             style={[
    //               styles.icons,
    //               {
    //                 marginHorizontal: moderateScale(5, 0.6),
    //               },
    //             ]}
    //             name={'call'}
    //             as={Ionicons}
    //             size={moderateScale(17, 0.6)}
    //             color={'white'}
    //           />
    //           <Icon
    //             onPress={() => {
    //               navigationService.navigate('MessagesScreen', {
    //                 data: ridedata,
    //                 fromDelivery: true,
    //               });
    //             }}
    //             style={styles.icons}
    //             name={'message1'}
    //             as={AntDesign}
    //             size={moderateScale(17, 0.6)}
    //             color={'white'}
    //           />
    //         </View>
    //       </View>
    //     </View>
    //   </View>
    // </SafeAreaView>
    <SafeAreaView style={styles.safe_are}>
      <Header showBack={true} title={'Navigation to Pickup'} />
      <View style={styles.main_view}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentPosition?.latitude,
            longitude: currentPosition?.longitude,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0521,
          }}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          customMapStyle={customMapStyle}>
          {Object.keys(origin)?.length > 0 && isValidCoordinate(origin) && (
            <>
              <Marker
                coordinate={origin}
                title="pickup  Location"
                pinColor={Color.red}>
                <View
                  style={{
                    height: windowHeight * 0.051,
                    width: windowWidth * 0.1,
                  }}>
                  <CustomImage
                    source={require('../Assets/Images/tracking-pin.png')}
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                  />
                </View>
              </Marker>
            </>
          )}

          <MapViewDirections
            apikey={'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8'}
            origin={origin}
            destination={destination}
            // waypoints={waypoints?.length > 0 ? waypoints : undefined}
            strokeColor={Color.black}
            strokeWidth={5}
            onStart={e => {
              console.log(
                'start route ========================= >>>>> aaaa',
                e,
              );
            }}
            onError={error => console.log('MapViewDirections Error:', error)}
            onReady={result => {
              if (mapRef.current && !isRouteFitted) {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 50,
                    left: 50,
                    top: 300,
                    bottom: 100,
                  },
                });
                setIsRouteFitted(true);
              }
            }}
          />

          {destination != null &&
            Object.keys(destination)?.length > 0 &&
            isValidCoordinate(destination) && (
              <Marker
                coordinate={destination}
                title="Drop-off Location"
                pinColor={Color.black}
              />
            )}
        </MapView>
        <View
          style={[
            styles.latest_ride_view,
            {
              top: 20,
            },
          ]}>
          <View style={styles.latest_ride_subView}>
            <View style={styles.latest_ride_image_view}>
              <CustomImage
                source={require('../Assets/Images/user.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: windowWidth,
                }}
              />
            </View>
            <View
              style={{
                marginLeft: moderateScale(10, 0.6),
                width: windowWidth * 0.45,
              }}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(13, 0.6),
                  color: Color.black,
                }}>
                {ridedata?.ride_info?.rider?.name}
              </CustomText>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText
                  isBold
                  style={{
                    fontSize: moderateScale(11, 0.6),
                    color: Color.black,
                  }}>
                  status :
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(11, 0.6),
                    color: Color.veryLightGray,
                    marginLeft: moderateScale(8, 0.6),
                  }}>
                  {ridedata?.ride_info?.status}
                </CustomText>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: windowWidth * 0.3,
                height: '100%',
                paddingHorizontal: moderateScale(10, 0.6),
                justifyContent: 'space-between',
                paddingTop: moderateScale(5, 0.6),
              }}>
              <Icon
                style={styles.icons}
                name={'call'}
                as={Ionicons}
                size={moderateScale(25, 0.6)}
                color={'white'}
              />
              <Icon
                onPress={() => {
                  navigationService.navigate('MessagesScreen', {
                    data: ridedata,
                    fromDelivery: true,
                  });
                }}
                style={styles.icons}
                name={'message1'}
                as={AntDesign}
                size={moderateScale(25, 0.6)}
                color={'white'}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TrackingScreen;

const styles = StyleSheet.create({
  background_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
    paddingVertical: moderateScale(30, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },

  latest_ride_view: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Color.white,
    alignItems: 'center',
    width: windowWidth * 0.95,
    marginHorizontal: moderateScale(10, 0.6),
    height: windowHeight * 0.085,
    paddingHorizontal: moderateScale(10, 0.6),
    borderRadius: moderateScale(30, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    paddingVertical: moderateScale(8, 0.6),
  },
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
    // backgroundColor :'red' ,
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

  latest_ride_image_view: {
    width: moderateScale(50, 0.6),
    height: moderateScale(50, 0.6),
    backgroundColor: Color.white,
    borderRadius: windowWidth,
  },
  latest_ride_subView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'green ',
  },

  icons: {
    backgroundColor: Color.darkBlue,
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    textAlign: 'center',
    borderRadius: (windowHeight * 0.05) / 2,
    paddingTop: moderateScale(7, 0.6),
    // alignSelf: 'center' ,
    alignItems: 'center',
    marginHorizontal: moderateScale(3, 0.6),
  },
});
