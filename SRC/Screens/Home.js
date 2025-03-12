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
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
const Home = () => {
  const token = useSelector(state => state.authReducer.token);
  const {user_type} = useSelector(state => state.authReducer);
  const rideData = useSelector(state => state.commonReducer.rideInfo);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [activebutton, setactivebutton] = useState('current');
  const [currentPosition, setCurrentPosition] = useState({});
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

  useEffect(() => {
    userRequestHistory();
  }, []);

  const userRequestHistory = async () => {
    const url = `auth/customer/ride_list?type=${activebutton}`;
    setHistoryLoading(true);
    const response = await Get(url, token);
    console.log('🚀 ~ userRequestHistory ~ response:', response?.data);
    setHistoryLoading(false);
    if (response != undefined) {
      setHistoryList(response?.data);
    }
  };

  return (
    <SafeAreaView style={styles.safe_area}>
      <Header title={''} />
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

              <View style={styles.second_Image}>
                <CustomImage
                  style={{height: '100%', width: '100%'}}
                  source={require('../Assets/Images/ridelink.png')}
                />
              </View>
            </View>
          </ImageBackground>
        </View>

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
                return <DeliveryBox data={item} />
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
              height={windowHeight * 0.053}
              bgColor={
                activebutton === 'current' ? Color.btn_Color : 'transparent'
              }
              textTransform={'capitalize'}
            />
            <CustomButton
              onPress={() => {
                setactivebutton('history')
              }}
              text={'History'}
              fontSize={moderateScale(14, 0.3)}
              textColor={
                activebutton === 'history' ? Color.white : Color.btn_Color
              }
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.42}
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
                return <Userbox data={item} />
              }}
            />
          )}
        </ScrollView>
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
  },

  text: {
    fontSize: moderateScale(14, 0.6),
    color: Color.black,
  },
  location: {
    fontSize: moderateScale(12, 0.6),
    color: Color.grey,
  },
});
