import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';

import {
  ActivityIndicator,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import navigationService from '../navigationService';
import {useDispatch} from 'react-redux';

import {Icon} from 'native-base';
import ImagePickerModal from '../Components/ImagePickerModal';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
const Profile = () => {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [showNumberModal, setShowNumberModal] = useState(false);
  console.log(
    '🚀 ~ file: Signup.js:48 ~ Signup ~ showNumberModal:',
    showNumberModal,
  );
  const [countryCode, setCountryCode] = useState('US');
  const [imagePicker, setImagePicker] = useState(false);
  console.log('🚀 ~ file: Signup.js:50 ~ Signup ~ imagePicker:', imagePicker);
  const [image, setImage] = useState({});

  const [country, setCountry] = useState({
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  });
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [withFilter, setFilter] = useState(true);
  const [phone, setPhone] = useState('');

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={()=>{
        navigation.goBack()
      }}
        style={styles.back}>
        <Icon
          name="arrowleft"
          as={AntDesign}
          style={styles.icon2}
          color={Color.white}
          size={moderateScale(20, 0.3)}
          onPress={()=>{
            navigation.goBack()
          }}
        />
      </TouchableOpacity>
      {/* <ImageBackground
          style={{
            width: windowWidth,
            minHeight: windowHeight,
            paddingBottom: moderateScale(40, 0.6),
            justifyContent: 'center',
            // backgroundColor:'red',
            // height: windowHeight*0.8,
            alignItems: 'center',
          }}
          source={require('../Assets/Images/setting_Bg.png')}> */}
          

          <View
            style={{
           
              height: windowHeight * 0.13,
              width: windowHeight * 0.13,
              borderRadius: moderateScale((windowHeight * 0.13) / 2),
              // overflow : 'hidden'
            }}>
            {/* <CustomImage
              resizeMode="contain"
              source={require('../Assets/Images/dummyUser1.png')}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'blue',

                borderRadius: moderateScale((windowHeight * 0.13) / 2),
              }}
            /> */}

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.edit}
              onPress={() => {
                setImagePicker(true);
              }}>
              <Icon
                name="pencil"
                as={FontAwesome}
                style={styles.icon2}
                color={Color.black}
                size={moderateScale(13, 0.3)}
                onPress={() => {
                  setImagePicker(true);
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              gap: 18,
              // paddingVertical: moderateScale(30, 0.3),
              alignItems: 'center',
              // justifyContent: 'center',
              marginTop: moderateScale(20, 0.3),
            }}>
            <TextInputWithTitle
              iconName={'user-circle-o'}
              iconType={FontAwesome}
              LeftIcon={true}
              titleText={'Username'}
              placeholder={'Username'}
              setText={setUserName}
              value={username}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              border={1}
              borderRadius={moderateScale(30, 0.3)}
              backgroundColor={Color.white}
              borderColor={Color.black}
              marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
            />

            <TextInputWithTitle
              iconName={'email'}
              iconType={Fontisto}
              LeftIcon={true}
              titleText={'Email'}
              placeholder={'Email'}
              setText={setEmail}
              value={email}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              border={1}
              borderRadius={moderateScale(30, 0.3)}
              borderColor={Color.black}
              backgroundColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
            />
            <TouchableOpacity
              onPress={() => {
                setShowNumberModal(true);
                console.log('first');
              }}
              activeOpacity={0.9}
              style={[
                styles.birthday,
                {
                  justifyContent: 'flex-start',
                  // backgroundColor: 'red',
                  borderRadius: moderateScale(25, 0.6),
                },
              ]}>
              <CountryPicker
                {...{
                  countryCode,
                  withCallingCode,
                  onSelect,
                  withFilter,
                }}
                visible={showNumberModal}
                onClose={() => {
                  setShowNumberModal(false);
                }}
              />

              {country && (
                <CustomText
                  style={{
                    fontSize: moderateScale(15, 0.6),
                    color: '#5E5E5E',
                  }}>{`${countryCode}(+${country?.callingCode})`}</CustomText>
              )}

              <Icon
                name={'angle-down'}
                as={FontAwesome}
                size={moderateScale(20, 0.6)}
                color={Color.themeDarkGray}
                onPress={() => {
                  setShowNumberModal(true);
                }}
                style={{
                  position: 'absolute',
                  right: moderateScale(5, 0.3),
                }}
              />
            </TouchableOpacity>
            <TextInputWithTitle
              iconName={'phone'}
              iconType={FontAwesome}
              LeftIcon={true}
              titleText={'Phone'}
              placeholder={'Phone'}
              setText={setPhone}
              value={phone}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              border={1}
              borderRadius={moderateScale(30, 0.3)}
              borderColor={Color.black}
              backgroundColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
            />
           
          
              <CustomButton
                onPress={() => navigationService.navigate('LoginScreen')}
                text={
                  isLoading ? (
                    <ActivityIndicator color={Color.white} size={'small'} />
                  ) : (
                    'SUBMIT'
                  )
                }
                fontSize={moderateScale(12, 0.3)}
                textColor={Color.white}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.75}
                height={windowHeight * 0.06}
                marginTop={moderateScale(20, 0.3)}
                bgColor={Color.themeColor2}
                isBold
                // isGradient
              />
          </View>
        {/* </ImageBackground> */}
        <ImagePickerModal
          show={imagePicker}
          setShow={setImagePicker}
          setFileObject={setImage}
        />
    </ScrollView>
  );
};

export default Profile;
const styles = ScaledSheet.create({
  birthday: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.06,
    marginTop: moderateScale(10, 0.3),
    borderRadius: moderateScale(10, 0.6),
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: Color.lightGrey,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Color.themeColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },

  edit: {
    backgroundColor: Color.white,
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    position: 'absolute',
    // top: 110,
    bottom: -2,
    right: 5,
    borderRadius: moderateScale(10, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
 back : {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    position: 'absolute',
    left: moderateScale(10, 0.6),
    top: moderateScale(10, 0.6),
    zIndex: 1,
    margin :5 ,
    alignItems : 'center',
    justifyContent : 'center'
  }
});
