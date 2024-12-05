import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import Header from '../Components/Header';
import {moderateScale} from 'react-native-size-matters';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Icon} from 'native-base';
import {Rating} from 'react-native-ratings';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import {useSelector} from 'react-redux';

const RateScreen = () => {
  const {user_type} = useSelector(state => state.authReducer);

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <Header textstyle={{fontWeight: 'regular'}} title={'Rate Passenger'} />
        <View style={styles.box}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.image_Style}>
              <CustomImage
                style={{
                  width: windowHeight * 0.06,
                  height: windowHeight * 0.06,
                }}
                source={require('../Assets/Images/riderphoto.png')}
              />
            </View>
            <CustomText
              style={{
                fontSize: moderateScale(14, 0.6),
                fontWeight: 'bold',
                color: Color.themeBlack,
                width: windowWidth * 0.45,
                marginLeft: moderateScale(13, 0.6),
              }}>
              Theodora J. Gardner
            </CustomText>
            <TouchableOpacity style={styles.button}>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.white,
                  fontWeight: 'bold',
                }}>
                COMPLETE
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: moderateScale(20, 0.6)}}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.Circle}>
                <Icon
                  style={{color: Color.white}}
                  as={FontAwesome5}
                  name="car"
                  size={moderateScale(12, 0.6)}
                />
              </View>
              <View style={{marginLeft: moderateScale(10, 0.6)}}>
                <CustomText
                  style={{
                    fontSize: moderateScale(12, 0.6),
                    color: Color.themeBlack,
                    fontWeight: 'bold',
                  }}>
                  Pickup
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(10, 0.6),
                    color: Color.themeBlack,
                    fontWeight: 'bold',
                  }}>
                  Fannie Street San Angelo, Texas
                </CustomText>
              </View>
            </View>
            <View
              style={{
                transform: [{rotate: '90deg'}],
                position: 'absolute',
                width: windowWidth * 0.1,
                top: moderateScale(30, 0.6),
                left: moderateScale(-4, 0.6),
              }}>
              <CustomText style={{color: Color.black}}>.........</CustomText>
            </View>
            <View
              style={{flexDirection: 'row', marginTop: moderateScale(20, 0.6)}}>
              <View style={styles.Circle}>
                <Icon
                  style={{color: Color.white}}
                  as={FontAwesome5}
                  name="car"
                  size={moderateScale(12, 0.6)}
                />
              </View>
              <View style={{marginLeft: moderateScale(10, 0.6)}}>
                <CustomText
                  style={{
                    fontSize: moderateScale(12, 0.6),
                    color: Color.themeBlack,
                    fontWeight: 'bold',
                  }}>
                  Drop Off
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(10, 0.6),
                    color: Color.themeBlack,
                    fontWeight: 'bold',
                  }}>
                  Neville Street Salem, Colorado
                </CustomText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.amountBox}>
          <View style={{gap: moderateScale(10, 0.6)}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.themeBlack,
                  fontWeight: '600',
                }}>
                Trip Fare Breakdown
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.themeBlack,
                }}>
                $50.25
              </CustomText>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.themeBlack,
                  fontWeight: '600',
                }}>
                Subtotal
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.themeBlack,
                }}>
                $50.25
              </CustomText>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.themeBlack,
                  fontWeight: '600',
                }}>
                Promo Code
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.themeBlack,
                }}>
                $5.25
              </CustomText>
            </View>
          </View>
          <View
            style={{
              width: windowWidth * 0.8,
              backgroundColor: Color.lightGrey,
              borderColor: Color.lightGrey,
              borderWidth: 0.5,
              marginTop: moderateScale(10, 0.6),
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: moderateScale(15, 0.6),
            }}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(16, 0.6),
                color: Color.themeBlack,
              }}>
              Total
            </CustomText>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(16, 0.6),
                color: Color.themeBlack,
              }}>
              $54.00
            </CustomText>
          </View>
        </View>
        <Rating
          type="custom"
          //   readonly
          startingValue={55}
          ratingCount={5}
          ratingColor={Color.yellow}
          imageSize={moderateScale(35, 0.3)}
          tintColor={Color.white}
          style={{marginTop: moderateScale(30, 0.6)}}
        />
        <View
          style={{
            position: 'absolute',
            bottom: moderateScale(30, 0.6),
            alignSelf: 'center',
          }}>
          <CustomButton
            text={'SUBMIT'}
            fontSize={moderateScale(15, 0.3)}
            textColor={Color.white}
            borderWidth={user_type === 'Rider' ? 0 : 1.5}
            borderColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.9}
            height={windowHeight * 0.075}
            bgColor={user_type === 'Rider' ? Color.darkBlue : Color.btn_Color}
            textTransform={'capitalize'}
            elevation={user_type === 'Rider' ? true : false}
            onPress={() => {
              if (user_type === 'Rider') {
                navigationService.navigate('RecieptScreen', {type: ''});
              } else {
                navigationService.navigate('Home');
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RateScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.white,
  },
  box: {
    height: windowHeight * 0.23,
    width: windowWidth * 0.89,
    // paddingHorizontal:moderateScale(15,0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(15, 0.6),
    alignSelf: 'center',
    marginTop: moderateScale(18, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image_Style: {
    width: windowHeight * 0.055,
    justifyContent: 'center',
    alignItems: 'center',

    height: windowHeight * 0.055,
  },
  button: {
    width: windowWidth * 0.22,
    height: windowHeight * 0.04,
    borderRadius: moderateScale(20, 0.6),
    backgroundColor: Color.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Circle: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    borderRadius: (windowWidth * 0.05) / 2,
    backgroundColor: Color.themeBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountBox: {
    height: windowHeight * 0.16,
    width: windowWidth * 0.89,
    // backgroundColor:'green',
    alignSelf: 'center',
    marginTop: moderateScale(25, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
  },
});
