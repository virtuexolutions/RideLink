import database from '@react-native-firebase/database';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import ReviewModal from '../Components/ReviewModal';

const ParcelTrackingScreen = props => {
  const isFocused = useIsFocused();
  const data = props?.route?.params?.data;
  const mapRef = useRef();
  const [upadtedStatus, SetUpdatedStatus] = useState('');
  const rbRef = useRef();
  useEffect(() => {
    const reference = database().ref(`/requests/${data?.delivery_id}`);
    const listener = reference.on('value', snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data?.ride_info?.status && data?.ride_info?.status !== 'pending') {
          SetUpdatedStatus(data?.ride_info?.status);
          // setRideuptedData(data);
          // setModalVisible(true);
          // setStatus(data.status);
        }
      }
    });

    return () => reference.off('value', listener);
  }, [isFocused, data?.delivery_id]);
  return (
    <ScrollView>
      <Header showBack={true} title={'parcel tracking'} />
      <View style={styles.main_con}>
        <CustomText style={styles.text}> {data?.delivery_id}</CustomText>
        <View style={styles.details_con}>
          <CustomText style={styles.txt1}> delivery address</CustomText>
          <CustomText numberOfLines={2} style={styles.add}>
            {data?.location_to}
          </CustomText>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{
              height: windowHeight * 0.2,
            }}
            initialRegion={{
              latitude: parseFloat(data?.destination_location_lat),
              longitude: parseFloat(data?.destination_location_lng),
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0521,
            }}></MapView>
          <CustomText style={styles.h1}>History</CustomText>
          <View style={styles.row_con}>
            <View
              style={{
                justifyContent: 'center',
                width: '20%',
                marginHorizontal: moderateScale(10, 0.6),
              }}>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                }}>
                date
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(10, 0.6),
                }}>
                time
              </CustomText>
            </View>
            <View style={styles.vertical_line}> </View>
            <CustomText
              style={{
                paddingHorizontal: moderateScale(10, 0.6),
              }}>
              {upadtedStatus}
            </CustomText>
            {upadtedStatus?.toLowerCase() == 'delivered' && (
              <TouchableOpacity
                onPress={() => {
                  rbRef?.current?.open();
                }}
                style={styles.review_btn}>
                <CustomText
                  style={{
                    fontSize: moderateScale(12, 0.6),
                  }}>
                  review
                </CustomText>
              </TouchableOpacity>
            )}
            <ReviewModal setRef={rbRef} rbRef={rbRef} item={data} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ParcelTrackingScreen;

const styles = StyleSheet.create({
  main_con: {
    height: windowHeight,
    width: windowWidth,
    paddingHorizontal: moderateScale(20, 0.6),
  },
  text: {
    fontSize: moderateScale(15, 0.6),
    color: Color.black,
    paddingVertical: moderateScale(10, 0.6),
  },
  details_con: {
    paddingHorizontal: moderateScale(10, 0.6),
    width: windowWidth * 0.9,
    backgroundColor: Color.white,
    borderRadius: 10,
    height: windowHeight * 0.4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: moderateScale(10, 0.6),
  },
  txt1: {
    fontSize: moderateScale(12, 0.6),
    color: Color.black,
  },
  add: {
    fontSize: moderateScale(12, 0.6),
    color: Color.black,
    paddingVertical: moderateScale(5, 0.6),
  },
  h1: {
    fontSize: moderateScale(17, 0.6),
    color: Color.black,
  },
  row_con: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  vertical_line: {
    height: windowHeight * 0.05,
    width: 1.5,
    backgroundColor: Color.black,
  },
  review_btn: {
    position: 'absolute',
    top: -20,
    right: 10,
    paddingHorizontal: moderateScale(7, 0.6),
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
