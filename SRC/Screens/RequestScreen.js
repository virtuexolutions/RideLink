import {useIsFocused} from '@react-navigation/native';
import {getDistance, isValidCoordinate} from 'geolib';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import AskLocation from '../Components/AskLocation';
import CabList from '../Components/CabList.js';
import CustomButton from '../Components/CustomButton';
import RequestForDelivery from '../Components/RequestForDelivery.js';
import {windowHeight, windowWidth} from '../Utillity/utils';

const RequestScreen = props => {
  const data = props?.route?.params?.data;
  const rbRef = useRef(null);
  const deliveryRef = useRef(null);

  const isFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const mapRef = useRef(null);

  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [locationType, setLocationType] = useState('pickup');
  const [fare, setFare] = useState(0);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [address, setAddress] = useState('');
  const [additionalLocation, setAdditionalLocation] = useState(false);
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  console.log('🚀 ~ currentPosition:=============== >>>>', currentPosition);
  const [multipleLocation, setMultipleLocation] = useState([]);
  const origin = {
    latitude: parseFloat(pickupLocation?.lat),
    longitude: parseFloat(pickupLocation?.lng),
  };
  const destination = {
    latitude: parseFloat(dropLocation?.lat),
    longitude: parseFloat(dropLocation?.lng),
  };
  const waypoints = multipleLocation?.map(item => ({
    latitude: parseFloat(item?.lat),
    longitude: parseFloat(item?.lng),
  }));

  useEffect(() => {
    getCurrentLocation();
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

  useEffect(() => {
    if (isValidCoordinate(currentPosition)) {
      mapRef.current?.animateToRegion(
        {
          latitude: currentPosition?.latitude,
          longitude: currentPosition?.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        },
        1000,
      );
    }
  }, [currentPosition]);

  const calculateRideFare = async (distance, time) => {
    const baseFare = 2.5;
    const costPerMile = 1.25;
    const costPerMinute = 0.3;
    const bookingFee = 1.75;
    const minimumFare = 6.0;

    let fare = baseFare + costPerMile * distance + costPerMinute * time;

    // fare *= surgeMultiplier
    fare += bookingFee;

    if (fare < minimumFare) {
      fare = minimumFare;
    }
    return fare.toFixed(2);
  };

  useEffect(() => {
    if (
      dropLocation &&
      (isCurrentLocation ? currentPosition : pickupLocation) != null
    ) {
      const checkDistanceBetween = getDistance(
        isCurrentLocation ? currentPosition : pickupLocation,
        dropLocation,
      );
      let km = Math.round(checkDistanceBetween / 1000);

      const distanceInMiles = km / 1.60934;

      const fetchFare = async () => {
        const calculatedFare = await calculateRideFare(distanceInMiles, time);
        setFare(calculatedFare);
      };
      setDistance(km);
      const getTravelTime = async () => {
        const GOOGLE_MAPS_API_KEY = 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8';
        try {
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${
            isCurrentLocation ? currentPosition?.latitude : pickupLocation.lat
          },${
            isCurrentLocation ? currentPosition?.longitude : pickupLocation.lng
          }&destinations=${dropLocation.lat},${
            dropLocation.lng
          }&key=${GOOGLE_MAPS_API_KEY}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data.status === 'OK') {
            const distanceMatrix = data.rows[0].elements[0];
            const travelTime = distanceMatrix.duration.text;
            const Time = parseInt(travelTime.match(/\d+/)[0]);
            console.log('yeh rha time ', Time);
            return setTime(Time);
          } else {
            console.error('Error fetching travel time:', data.status);
            return null;
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getTravelTime();
      fetchFare();
    }
  }, [dropLocation]);

  useEffect(() => {
    if (isValidCoordinate(origin)) {
      const reigion = {
        latitude: origin?.latitude,
        longitude: origin?.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0521,
      };
      mapRef.current?.animateToRegion(reigion, 1000);
    }
  }, [origin]);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const GOOGLE_MAPS_API_KEY = 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8';
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
      console.error('errrrrrrrrrrrrrrrrrr from cordinatesssssss', error);
    }
  };

  const apikey = 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8';

  const handleMultipleStopsUpdate = updatedStops => {
    setMultipleLocation(updatedStops);
  };

  return (
    <SafeAreaView style={styles.safearea_view}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(currentPosition.latitude),
          longitude: parseFloat(currentPosition.longitude),
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        }}>
        {Object.keys(isCurrentLocation ? currentPosition : origin)?.length >
          0 &&
          isValidCoordinate(isCurrentLocation ? currentPosition : origin) && (
            <>
              <Marker
                coordinate={isCurrentLocation ? currentPosition : origin}
                title="pickup  Location"
                pinColor={Color.red}
              />
            </>
          )}

        {Array.isArray(multipleLocation) &&
          multipleLocation?.map((stop, index) => (
            <Marker
              key={index}
              coordinate={{latitude: stop.lat, longitude: stop.lng}}
              title={`Stop ${index + 1}`}
              description={
                stop.name ||
                `Stop at latitude: ${stop.lat}, longitude: ${stop.lng}`
              }
              pinColor={Color.black}
            />
          ))}
        {!['', null, undefined].includes(origin) &&
          !['', null, undefined].includes(destination) && (
            <MapViewDirections
              key={`${origin?.latitude}-${origin?.longitude}-${destination?.latitude}-${destination?.longitude}-${waypoints?.length}`}
              origin={isCurrentLocation ? currentPosition : origin}
              waypoints={waypoints}
              destination={destination}
              strokeColor={Color.black}
              strokeWidth={6}
              apikey={apikey}
              optimizeWaypoints={false}
              onStart={params => {}}
              onError={e => {
                console.log('map vview direction erorrrrrrrrrrrrrr', e);
              }}
              tappable={true}
              onReady={result => {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 50,
                    left: 50,
                    top: 300,
                    bottom: 100,
                  },
                });
              }}
            />
          )}
        {destination != null &&
          Object.keys(destination)?.length > 0 &&
          isValidCoordinate(destination) && (
            <Marker
              coordinate={destination}
              title="Drop-off Location"
              pinColor={Color.green}
            />
          )}
      </MapView>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          alignItems: 'center',
          width: windowWidth,
        }}>
        <AskLocation
          onPressCurrentLocation={() => {
            setIsCurrentLocation(true);
            getCurrentLocation();
            setIsModalVisible(false);
          }}
          setAddress={setAddress}
          address={address}
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          isModalVisible={isModalVisible}
          setDropLocation={setDropLocation}
          dropLocation={dropLocation}
          pickupLocation={pickupLocation}
          setPickupLocation={setPickupLocation}
          setIsModalVisible={setIsModalVisible}
          heading={'Where are you Going?'}
          pickupLocationName={isCurrentLocation && address}
          locationType={locationType}
          setLocationType={setLocationType}
          multipleLocation={multipleLocation}
          setMultipleLocation={setMultipleLocation}
          onUpdateLocation={handleMultipleStopsUpdate}
          setAdditionalLocation={setAdditionalLocation}
          additionalLocation={additionalLocation}
          fromrequest={true}
          isIcon
          islocation
        />
        <CustomButton
          width={windowWidth * 0.9}
          height={windowHeight * 0.075}
          bgColor={Color.themeBlack}
          borderRadius={moderateScale(30, 0.3)}
          textColor={Color.white}
          textTransform={'none'}
          text={'CONFIRM NOW'}
          marginBottom={moderateScale(10, 0.6)}
          onPress={() => {
            if (
              // cabType != null &&
              (dropLocation != null && pickupLocation) ||
              address != null
            ) {
              // if (data?.title == 'ride') {
              rbRef?.current?.open();
              // navigationService.navigate('FareScreen', {
              //   rideData: {
              //     distance: parseInt(distance),
              //     time: time,
              //     fare: Number(fare),
              //     pickup: origin,
              //     dropoff: destination,
              //     currentPosition: currentPosition,
              //     pickupLocation: pickupLocation,
              //     dropoffLocation: dropLocation,
              //     CabType: cabType,
              //     data: data,
              //     multiplePickups: multipleLocation,
              //   },
              // });
              // } else {
              //   deliveryRef.current.open();
              // }
            } else {
              Platform.OS == 'android'
                ? ToastAndroid.show(
                    'required feild is empty',
                    ToastAndroid.SHORT,
                  )
                : Alert.alert('required feild is empty');
            }
          }}
        />
      </View>
      <RequestForDelivery
        rbRef={deliveryRef}
        item={{
          pickupLocation: pickupLocation,
          dropLocation: dropLocation,
          fare: fare,
          data: data,
        }}
      />
      <CabList
        rbRef={rbRef}
        data={{
          distance: parseInt(distance),
          time: time,
          fare: Number(fare),
          pickup: origin,
          dropoff: destination,
          currentPosition: currentPosition,
          pickupLocation: isCurrentLocation
            ? {
                lat: currentPosition?.latitude,
                lng: currentPosition?.longitude,
                name: address,
              }
            : pickupLocation,
          dropoffLocation: dropLocation,
          iscurrent: isCurrentLocation ? true : false,
          data: data,
          multiplePickups: multipleLocation,
        }}
      />
    </SafeAreaView>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  safearea_view: {
    width: windowWidth,
    height: windowHeight,
  },
  background_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
    paddingVertical: moderateScale(20, 0.6),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cab_view: {
    height: windowHeight * 0.2,
    backgroundColor: Color.white,
    width: windowWidth * 0.7,
    marginHorizontal: moderateScale(10, 0.6),
    borderRadius: moderateScale(20, 0.6),
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#32C5FF3D',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingVertical: moderateScale(15, 0.6),
    marginBottom: moderateScale(40, 0.6),
  },
  image_view: {
    width: moderateScale(120, 0.6),
    height: moderateScale(100, 0.6),
  },
  text: {
    fontSize: moderateScale(18, 0.6),
    fontWeight: '700',
  },
  price: {
    fontSize: moderateScale(12, 0.6),
    color: '#22211D',
  },
  btn: {
    width: moderateScale(100, 0.6),
    height: moderateScale(40, 0.6),
    borderRadius: moderateScale(20, 0.6),
    marginTop: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    color: Color.white,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
  },
  location_View: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    backgroundColor: Color.lightGrey,
    bottom: 20,
    borderRadius: moderateScale(15, 0.6),
  },
  location_subview: {
    width: windowWidth * 0.9,
    height: moderateScale(50, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(15, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  location_head: {
    fontSize: moderateScale(12, 0.6),
    fontWeight: '600',
  },
  icon_view: {
    width: moderateScale(25, 0.6),
    height: moderateScale(25, 0.6),
    backgroundColor: Color.lightGrey,
    borderRadius: moderateScale(20, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatView: {
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(12, 0.6),
    flexDirection: 'row',
  },
  text1: {
    fontSize: moderateScale(9, 0.6),
    textAlign: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
