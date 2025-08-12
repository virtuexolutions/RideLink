import { useIsFocused } from '@react-navigation/native';
import { getDistance, isValidCoordinate } from 'geolib';
import { Icon } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import { customMapStyle } from '../Utillity/mapstyle';
import { windowHeight, windowWidth } from '../Utillity/utils';

const RideScreen = ({route}) => {
  const {data, type, status} = route?.params;

  const isFocused = useIsFocused();
  const mapRef = useRef(null);

  const token = useSelector(state => state.authReducer.token);
  const [isNearDestination, setIsNearDestination] = useState(false);

  const [currentPosition, setCurrentPosition] = useState({
    // latitude: 0,
    // longitude: 0,
    latitude: 37.43312021,
    longitude: -122.0876855,
  });
  const apikey = 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8';
  const origin = {
    lat:
      // type === 'details'
      currentPosition?.latitude,
    // : parseFloat(data?.ride_info?.pickup_location_lat),
    lng:
      // type === 'details'
      currentPosition?.longitude,
    // : parseFloat(data?.ride_info?.pickup_location_lng),
  };
  const destination = {
    lat:
      // type === 'details'
      // ?
      parseFloat(data?.dropoff_location_lat),
    // : parseFloat(data?.ride_info?.rider?.lat),
    lng:
      // type === 'details'
      // ?
      parseFloat(data?.dropoff_location_lng),
    // : parseFloat(data?.ride_info?.rider?.lng),
  };

 

  useEffect(() => {
    getCurrentLocation();
  }, [isFocused]);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentPosition(prevLocation => ({
          ...prevLocation,
          latitude,
          longitude,
        }));

        const distance = getDistance(currentPosition, destination); // in meters
        setIsNearDestination(distance <= 20);

        // const isLocationClose = (lat1, lon1, lat2, lon2, threshold = 0.0001) =>
        //   Math.abs(lat1 - lat2) < threshold &&
        //   Math.abs(lon1 - lon2) < threshold;
        // if (
        //   isLocationClose(
        //     37.4219983,
        //     -122.084,
        //     37.43312021060092,
        //     -122.08768555488422,
        //   )
        // ) {
        //   // if (isLocationClose(latitude, !isriderArrive ? origin?.lat : destination?.lat, longitude,!isriderArrive ?  origin?.lng : destination?.lng)) {
        //   console.log(
        //     'location same eeeeeeeeeeeeeeeeeeeeeeeeee',
        //     latitude,
        //     origin.lat,
        //     longitude,
        //     origin.lng,
        //   );

        //   setIsRiderArrived(true);
        // }
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

  return (
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
          // customMapStyle={customMapStyle}
        >
          <Marker
            coordinate={{
              latitude: origin?.lat,
              longitude: origin?.lng,
            }}
            pinColor={Color.black}
          />
          <MapViewDirections
            apikey={'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8'}
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
          {Object.keys(destination)?.length > 0 &&
            isValidCoordinate(destination) && (
              <Marker
                pinColor={Color.black}
                coordinate={{
                  latitude: destination?.lat,
                  longitude: destination?.lng,
                }}
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
                  backgroundColor: 'red',
                  width: '100%',
                  height: '100%',
                  borderRadius: windowWidth,
                }}
              />
            </View>
            <View
              style={{
                marginLeft: moderateScale(10, 0.6),
                width: windowWidth * 0.5,
              }}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(13, 0.6),
                  color: Color.black,
                }}>
                {data?.rider?.name}
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
                  {data?.status}
                </CustomText>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: windowWidth * 0.23,
                height: '100%',
                paddingHorizontal: moderateScale(10, 0.6),
                justifyContent: 'space-between',
              }}>
              <Icon
                onPress={() => {
                  Linking.openURL(`tel:${data?.ride_info?.rider?.phone}`);
                }}
                style={styles.icons}
                name={'call'}
                as={Ionicons}
                size={moderateScale(17, 0.6)}
                color={'white'}
              />
              <Icon
                onPress={() => {
                  navigationService.navigate('MessagesScreen', {
                    data: data,
                    fromDelivery: true,
                  });
                }}
                style={styles.icons}
                name={'message1'}
                as={AntDesign}
                size={moderateScale(17, 0.6)}
                color={'white'}
              />
            </View>
          </View>
        </View>

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
    height: windowHeight * 0.035,
    width: windowHeight * 0.035,
    textAlign: 'center',
    borderRadius: (windowHeight * 0.035) / 2,
    paddingTop: moderateScale(5, 0.6),
  },
});
