import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from './CustomButton';
import {Rating} from 'react-native-ratings';

const RequestModal = ({
  isVisible,
  onBackdropPress,
  onPressAccept,
  onPressDecline,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="up"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onBackdropPress={onBackdropPress}>
      <View style={styles.main_view}>
        <View style={styles.sub_view}>
          <View style={styles.header_view}>
            <View style={styles.image_view}>
              <CustomImage
                style={styles.image}
                source={require('../Assets/Images/user_Image.png')}
              />
            </View>
            <View style={styles.text_view}>
              <CustomText isBold style={styles.name}>
                Theodora J. Gardner
              </CustomText>
              <Rating
                type="custom"
                //   readonly
                startingValue={55}
                ratingCount={5}
                ratingColor={Color.yellow}
                imageSize={moderateScale(10, 0.3)}
                tintColor={Color.white}
                style={{alignSelf: 'flex-start'}}
              />
              <CustomText style={styles.text}>X Regular</CustomText>
            </View>
            <View>
              <CustomText style={styles.text}>8 Mins</CustomText>
              <CustomText style={styles.text}>2.3 Km</CustomText>
            </View>
          </View>
          <View style={styles.seatView}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: moderateScale(5, 0.6),
                }}>
                <View style={styles.icon_view}>
                  <Icon
                    name="battery-charging"
                    as={MaterialCommunityIcons}
                    size={moderateScale(12, 0.6)}
                    color={Color.white}
                  />
                </View>
                <View>
                  <CustomText isBold style={[styles.text1]}>
                    PickUp
                  </CustomText>
                  <CustomText style={[styles.text1]}>
                    Fannie Street San Angelo, Texas
                  </CustomText>
                </View>
              </View>
              <CustomText
                isBold
                style={[
                  styles.text1,
                  {
                    position: 'absolute',
                    color: 'black',
                    top: 27,
                    marginLeft: moderateScale(-5, 0.6),
                    transform: [{rotate: '-90deg'}],
                  },
                ]}>
                -----
              </CustomText>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: moderateScale(10, 0.6),
                }}>
                <View style={styles.icon_view}>
                  <Icon
                    name="battery-charging"
                    as={MaterialCommunityIcons}
                    size={moderateScale(12, 0.6)}
                    color={Color.white}
                  />
                </View>
                <View>
                  <CustomText isBold style={[styles.text1]}>
                    DropOff
                  </CustomText>
                  <CustomText style={[styles.text1]}>
                    Fannie Street San Angelo, Texas
                  </CustomText>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: moderateScale(12, 0.6),
            }}>
            <CustomText isBold style={{fontSize: moderateScale(16, 0)}}>
              Total
            </CustomText>
            <CustomText isBold style={{fontSize: moderateScale(16, 0)}}>
              $ 45.00
            </CustomText>
          </View>
        </View>
        <CustomButton
          width={windowWidth * 0.92}
          height={windowHeight * 0.075}
          bgColor={Color.themeBlack}
          borderRadius={moderateScale(30, 0.3)}
          textColor={Color.white}
          textTransform={'none'}
          text={'ACCEPT'}
          isBold
          style={{top: moderateScale(-40)}}
          marginBottom={moderateScale(10, 0.6)}
          onPress={onPressAccept}
        />
        <CustomButton
          width={windowWidth * 0.92}
          height={windowHeight * 0.075}
          bgColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          textColor={Color.black}
          isBold
          textTransform={'none'}
          text={'DEClINE'}
          style={{top: moderateScale(-40)}}
          marginBottom={moderateScale(10, 0.6)}
          borderWidth={2}
          onPress={onPressDecline}
        />
      </View>
    </Modal>
  );
};

export default RequestModal;

const styles = StyleSheet.create({
  main_view: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'rgba(225, 225, 225, 0.23)',
  },
  sub_view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.35,
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: moderateScale(20, 0.6),
    marginTop: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image_view: {
    width: moderateScale(50, 0.6),
    height: moderateScale(50, 0.6),
    borderRadius: windowWidth,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  header_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(10, 0.6),
    borderBottomWidth: 0.6,
    borderBottomColor: Color.grey,
  },
  text_view: {
    marginLeft: moderateScale(10, 0.6),
    width: '70%',
  },
  name: {
    fontSize: moderateScale(14, 0.6),
  },
  text: {
    fontSize: moderateScale(11, 0.6),
  },
  seatView: {
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.6),
    flexDirection: 'row',
    borderBottomColor: Color.grey,
    borderBottomWidth: 0.2,
    marginTop: moderateScale(12, 0.6),
  },
  text1: {
    fontSize: moderateScale(9, 0.6),
    textAlign: 'left',
    marginLeft: moderateScale(10, 0.6),
  },
  icon_view: {
    width: moderateScale(15, 0.6),
    height: moderateScale(15, 0.6),
    backgroundColor: Color.black,
    borderRadius: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
