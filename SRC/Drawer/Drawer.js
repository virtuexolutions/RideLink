import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import {setUserLogoutAuth, setUserToken} from '../Store/slices/auth';
import {SetUserRole} from '../Store/slices/auth-slice';
import {setUserLogOut} from '../Store/slices/common';
import {windowHeight, windowWidth} from '../Utillity/utils';

const Drawer = React.memo(() => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
    const userData = useSelector(state => state.commonReducer.userData);
  const isSiginWithGoogle = useSelector(
    state => state.commonReducer.isSiginWithGoogle,
  );
  const navigation = useNavigation();
  const adminData = [
    {
      id: 1,
      name: 'Home',
      onPress: () => {
        navigation.navigate('Home');
      },
    },

    // {
    //   id: 2,
    //   name: 'Refer Friends',
    //   onPress: () => {
    //     // setIsModalVisible(true);
    //     navigation.navigate('ReferFriendScreen');
    //   },
    // },

    // {
    //   id: 4,
    //   name: 'History',
    //   onPress: () => {
    //     navigation.navigate('History');
    //   },
    // },
    {
      id: 5,
      name: 'Accounts ',
      onPress: () => {
        navigation.navigate('Profile');
      },
    },
    {
      id: 6,
      name: 'Change password ',
      onPress: () => {
        navigation.navigate('ChangePassword');
      },
    },
    {
      id: 111,
      name: 'notification',
      onPress: () => {
        // navigation.navigate('Notification');
      },
    },
    {
      id: 3,
      name: 'promotion /discounts and referrlas',
      onPress: () => {
        // navigation.navigate('MyJourneys');
      },
    },
    {
      id: 4,
      name: 'customer support',
      onPress: () => {
        // navigation.navigate('SupportScreen');
      },
    },
    {
      id: 6,
      name: 'privacy policy ',
      onPress: () => {
        navigation.navigate('PrivacyPolicy');
      },
    },
    {
      id: 6,
      name: 'terms & conditions',
      onPress: () => {
        navigation.navigate('TermsAndConditions');
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
           {userData?.name}
          </CustomText>
        </View>
        <View
          style={{
            height: '60%',
            marginTop: moderateScale(20, 0.6),
          }}>
          {adminData.map((item, index) => (
            <>
              <TouchableOpacity
                key={item.id}
                onPress={item.onPress}
                style={{
                  width: windowWidth * 0.7,
                  borderColor: Color.black,
                  margin: moderateScale(10, 0.3),
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
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('HelpAndSupport');
            }}
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
            onPress={() => {
              navigation.navigate('LearningCenter');
            }}
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
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              if (!isSiginWithGoogle) {
                console.log('logout and empty userdata');
                dispatch(setUserToken({token: ''}));
                dispatch(setUserLogOut());
                dispatch(setUserLogoutAuth());
              } else {
                console.log('logout and remove token ');
                dispatch(setUserToken({token: ''}));
              }
            }}
            style={{
              width: windowWidth * 0.7,
              borderColor: Color.black,
              margin: moderateScale(5, 0.3),
              flexDirection: 'row',
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
});

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
