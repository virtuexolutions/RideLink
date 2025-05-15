// RideStatusPlaceholderScreen.js

import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import navigationService from '../navigationService';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';

const PlaceHolderScreen = () => {
  const navigation = useNavigation();
  const [requestList, setRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.authReducer.token);
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   rideRequestList();
  // }, []);
  const rideRequestList = async () => {
    const url = `auth/customer/all_ride_list`;
    setIsLoading(true);
    console.log('🚀 ~ rideRequestList ~ url: >>>>>', url);

    try {
      const response = await Get(url, token);
      console.log(
        '🚀 ~ rideRequestList ~ response:',
        response?.data?.ride_info,
      );
      const rides = response?.data?.ride_info;
      console.log('🚀 ~ rideRequestList ~ rides:', rides);

      console.log(
        '🚀 ~ rideRequestList ~ response:',
        JSON.stringify(rides?.status, null, 2),
      );

      if (Array.isArray(rides) && rides.length > 0) {
        const ride = rides[0]; // Assuming only 1 ride at a time
        console.log('🚀 ~ rideRequestList ~ ride:', ride);
        const status = ride?.status?.toLowerCase();
        console.log('🚀 ~ rideRequestList ~ status:', status);
        const goHomeStatuses = [
          'pending',
          'cancelled',
          'completed',
          'reviewed',
        ];
        console.log(
          '================================= >>> goHomeStatuses.includes(status)',
          goHomeStatuses.includes(status),
          status,
        );
        if (goHomeStatuses.includes(status)) {
          navigationService.navigate('Home');
        } else {
          navigationService.navigate('TrackingScreen', {
            data: ride,
            type: 'details',
          });
        }

        setRequestList(rides);
      } else {
        setRequestList([]);
        navigationService.navigate('Home');
      }
    } catch (error) {
      console.error('Error fetching ride requests:', error);
      navigationService.navigate('Home');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      rideRequestList();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder borderRadius={4}>
        <View
          style={{
            height: windowHeight,
            width: windowWidth,
            backgroundColor: 'red',
            alignItems: 'center',
          }}>
          <View style={styles.searchBar} />
          {/* Search Bar */}
          {/* <View style={styles.searchBar} /> */}

          {/* Top Container */}
          <View style={styles.topContainer} />

          {/* Row of Three Containers */}
          <View style={styles.rowContainer}>
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
          </View>
        </View>
      </SkeletonPlaceholder>
      {/* <SkeletonPlaceholder borderRadius={8}>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={60} height={60} borderRadius={30} />
          <SkeletonPlaceholder.Item marginLeft={20}>
            <SkeletonPlaceholder.Item width={120} height={20} />
            <SkeletonPlaceholder.Item marginTop={6} width={180} height={20} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item marginTop={30}>
          <SkeletonPlaceholder.Item
            width="100%"
            height={200}
            borderRadius={10}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={30}>
          <SkeletonPlaceholder.Item
            width="100%"
            height={200}
            borderRadius={10}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder> */}
    </View>
  );
};

export default PlaceHolderScreen;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
  },
  searchBar: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.07,
    borderRadius: moderateScale(10, 0.6),
    marginBottom: moderateScale(20, 0.6),
  },
  topContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.25,
    borderRadius: moderateScale(10, 0.6),
    marginBottom: moderateScale(20, 0.6),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
    borderRadius: moderateScale(10, 0.6),
  },
});
