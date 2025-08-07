// RideStatusPlaceholderScreen.js

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
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

  useEffect(() => {
    rideRequestList();
  }, [isFocused]);
  const rideRequestList = async () => {
    const url = `auth/customer/all_ride_list`;
    setIsLoading(true);

    try {
      const response = await Get(url, token);

      const rides = response?.data?.ride_info;

      if (Array.isArray(rides) && rides.length > 0) {
        const ride = rides[0]; // Assuming only 1 ride at a time
        const status = ride?.ride_info?.status?.toLowerCase();
        const goHomeStatuses = [
          'pending',
          'cancel',
          'complete',
          'reviewed',
        ];
        console.log(
          '================================= >>> goHomeStatuses.includes(status)',
          goHomeStatuses.includes(status),
          status,
        );
        if (goHomeStatuses.includes(status)) {
          navigationService.navigate('Home');
        } 
        else {
          navigationService.navigate('TrackingScreen', {
            data: ride,
            type: 'details',
          });
        }

        setRequestList(rides);
      } else {
        // setRequestList([]);
        navigationService.navigate('Home');
      }
    } catch (error) {
      console.error('Error fetching ride requests:', error);
      navigationService.navigate('Home');
    }

    setIsLoading(false);
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //     rideRequestList();
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [isFocused]);
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={'black'} />
      {/* <SkeletonPlaceholder borderRadius={4}>
        <View
          style={{
            height: windowHeight,
            width: windowWidth,
            backgroundColor: 'transparent',
            alignItems: 'center',
            marginTop: moderateScale(20, 0.6),
          }}>
          <View style={styles.searchBar} />
      
          <View style={styles.topContainer} />

      
          <View style={styles.rowContainer}>
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
          </View>
        </View>
      </SkeletonPlaceholder> */}
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
    width: windowWidth * 0.9,
    height: windowHeight * 0.07,
    borderRadius: moderateScale(10, 0.6),
    marginBottom: moderateScale(20, 0.6),
  },
  topContainer: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
    borderRadius: moderateScale(10, 0.6),
    marginBottom: moderateScale(30, 0.6),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.13,
    borderRadius: moderateScale(10, 0.6),
    marginHorizontal: moderateScale(10, 0.6),
  },
});
