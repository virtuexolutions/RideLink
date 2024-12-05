import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import {windowHeight, windowWidth} from '../Utillity/utils';
import navigationService from '../navigationService';

const Drawer = () => {
  const navigation = useNavigation();
  const adminData = [
    {
      name: 'Inbox',
      onPress: () => {
        navigation.navigate('HomeScreen');
      },
    },
    {
      name: 'Refer Friends',
      onPress: () => {
        navigation.navigate('PaymentHistory');
      },
    },
    {
      name: 'Oppurtunities',
      onPress: () => {
        navigation.navigate('MyJourneys');
      },
    },
    {
      name: 'Earnings',
      onPress: () => {
        navigation.navigate('Earningsscreen');
      },
    },
    {
      name: 'Accounts ',
      onPress: () => {
        navigation.navigate('Profile');
      },
    },
  ];

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <View
        style={{
          height: windowHeight,
          backgroundColor: Color.white,
          borderTopRightRadius: moderateScale(120, 0.6),
          borderBottomRightRadius: moderateScale(120, 0.6),
          paddingVertical: moderateScale(60, 0.6),
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={styles.profile_view}>
          <View style={styles.image_view}>
            <CustomImage
              style={styles.image}
              source={require('../Assets/Images/user_image2.png')}
            />
          </View>
          <View
            style={{
              width: moderateScale(15, 0.6),
              height: moderateScale(15, 0.6),
              backgroundColor: '#04FF3F',
              borderRadius: windowWidth,
              top: -12,
              left: 10,
            }}
          />
          <CustomText isBold style={styles.heading_text}>
            PAT H. JHONSON 
          </CustomText>
          <CustomText style={styles.text}>Diver : Car Name</CustomText>
        </View>
        <View
          style={{
            height: '60%',
          }}>
          {adminData.map((item, index) => (
            <>
              <TouchableOpacity
                onPress={item.onPress}
                style={{
                  width: windowWidth * 0.7,
                  borderColor: Color.black,
                  margin: moderateScale(13, 0.3),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <CustomText
                  style={{
                    fontSize: moderateScale(14, 0.6),
                    color: Color.black,
                  }}>
                  {item.name}
                </CustomText>
              </TouchableOpacity>
            </>
          ))}
        </View>
        <View style={styles.end_view}>
          <TouchableOpacity
            style={{
              width: windowWidth * 0.7,
              borderColor: Color.black,
              margin: moderateScale(5, 0.3),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(14, 0.6),
                color: Color.black,
              }}>
              Help
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: windowWidth * 0.7,
              borderColor: Color.black,
              margin: moderateScale(5, 0.3),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(14, 0.6),
                color: Color.black,
              }}>
              Learning Center
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: windowWidth * 0.7,
              borderColor: Color.black,
              margin: moderateScale(5, 0.3),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(14, 0.6),
                color: Color.veryLightGray,
              }}>
              Logout
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenBoiler>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  Profile: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: (windowWidth * 0.2) / 1,
    borderWidth: 1,
    borderColor: Color.white,
    overflow: 'hidden',
  },
  menu_text: {
    color: Color.darkGray,
  },
  profile_view: {
    paddingHorizontal: moderateScale(20, 0.6),
    height: '20%',
    paddingVertical: moderateScale(20, 0.6),
  },
  image_view: {
    width: moderateScale(60, 0.6),
    height: moderateScale(60, 0.6),
    borderRadius: windowHeight,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: windowHeight,
  },
  heading_text: {
    fontSize: moderateScale(14, 0.6),
    textTransform: 'uppercase',
  },
  text: {
    fontSize: moderateScale(11, 0.6),
  },
  end_view: {
    height: '20%',
    width: '100%',
    paddingHorizontal: moderateScale(20, 0.6),
  },
});
