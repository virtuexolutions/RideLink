import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  requestLocationPermission,
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
import {moderateScale, s} from 'react-native-size-matters';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import SearchbarComponent from '../Components/SearchbarComponent';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';

import DeliveryBox from '../Components/DeliveryBox';
import CustomButton from '../Components/CustomButton';
import Userbox from '../Components/Userbox';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon, ScrollView} from 'native-base';
import navigationService from '../navigationService';
import {useSelector} from 'react-redux';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useIsFocused} from '@react-navigation/native';

const Home = () => {
  const token = useSelector(state => state.authReducer.token);
  const isFocused = useIsFocused()
  const [activebutton, setactivebutton] = useState('current');
  const {user_type} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [requestList, setRequestList] = useState([]);
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
      id: 1,
      name: 'Dominic Ement',
      location: 'Mercedes (ET YL421)',
      date: '17 March 2022',
      image: require('../Assets/Images/user_Image.png'),
    },
    {
      id: 2,
      name: 'Dominic Ement',
      location: 'Mercedes (ET YL421)',
      date: '17 March 2022',
      image: require('../Assets/Images/user_image2.png'),
    },
    {
      id: 3,
      name: 'Dominic Ement',
      location: 'Mercedes (ET YL421)',
      date: '17 March 2022',
      image: require('../Assets/Images/user_image3.png'),
    },
    {
      id: 4,
      name: 'Dominic Ement',
      location: 'Mercedes (ET YL421)',
      date: '17 March 2022',
      image: require('../Assets/Images/user_image4.png'),
    },
    {
      id: 5,
      name: 'Dominic Ement',
      location: 'Mercedes (ET YL421)',
      date: '17 March 2022',
      image: require('../Assets/Images/user_Image.png'),
    },
    {
      id: 6,
      name: 'Dominic Ement',
      location: 'Mercedes (ET YL421)',
      date: '17 March 2022',
      image: require('../Assets/Images/user_image2.png'),
    },
  ];

  const rideRequestList = async () => {
    const url = '';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
    }
  };


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
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item?.id}
              data={user_list}
              contentContainerStyle={{marginBottom: moderateScale(100, 0.6)}}
              style={{marginBottom: moderateScale(20, 0.6)}}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                      navigationService.navigate('RideRequest', {type: ''})
                    }>
                    <View style={styles.image_view}>
                      <CustomImage source={item.image} style={styles.image} />
                    </View>
                    <View style={styles.text_view}>
                      <CustomText style={styles.text}>{item.name}</CustomText>
                      <CustomText style={styles.location}>
                        {item.location}
                      </CustomText>
                      <CustomText style={styles.date}>{item.date}</CustomText>
                    </View>
                    <View style={styles.icon_view}>
                      <Icon
                        name="right"
                        as={AntDesign}
                        size={moderateScale(14, 0.6)}
                        color={Color.white}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
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
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{paddingBottom: moderateScale(150, 0.6)}}
              contentContainerStyle={{gap: moderateScale(10, 0.6)}}
              data={userBox}
              renderItem={({item}) => {
                return (
                  <Userbox
                    data={item}
                    // onPress={}
                  />
                );
              }}
            />
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
    height: windowHeight * 0.255,
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
