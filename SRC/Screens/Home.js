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
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
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
import {ScrollView} from 'native-base';
import navigationService from '../navigationService';

const Home = () => {
  const [activebutton, setactivebutton] = useState('current');
  console.log('aftab', activebutton);
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
  return (
    <SafeAreaView style={styles.safe_area}>
      <Header />
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
              borderRadius: moderateScale(17, 0.6),
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
                  marginTop: moderateScale(100, 0.6),
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
              height={windowHeight * 0.06}
              bgColor={
                activebutton === 'current' ? Color.btn_Color : Color.white
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
              height={windowHeight * 0.06}
              bgColor={
                activebutton === 'history' ? Color.btn_Color : Color.lightGrey
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
                  onPress={() => navigationService.navigate('RequestScreen')}
                />
              );
            }}
          />
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
    bac: Color.white,
  },
  main_Container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.white,
    // backgroundColor:"red",
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.6),
  },
  ridelink_Box: {
    width: windowWidth * 0.88,
    height: windowHeight * 0.255,
    // backgroundColor:'red',
    alignSelf: 'center',
    borderRadius: moderateScale(17, 0.6),
    borderWidth: 1.8,
    borderColor: Color.boxgrey,
  },
  link_Image: {
    width: windowWidth * 0.88,
    height: windowHeight * 0.25,
    borderRadius: moderateScale(17, 0.6),
    alignSelf: 'center',
  },
  second_Image: {
    height: windowHeight * 0.32,
    width: windowWidth * 0.52,
    right: moderateScale(25, 0.6),
    top: moderateScale(15, 0.6),
  },
  container_Style: {
    // marginTop:moderateScale(10,0.6),
    paddingVertical: moderateScale(40, 0.6),
    // marginLeft:moderateScale(10,0.6),
    // backgroundColor:'green',
    // height:windowHeight *0.15
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
});
