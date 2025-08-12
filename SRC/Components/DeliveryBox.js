import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import navigationService from '../navigationService';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';

const DeliveryBox = ({data}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigationService.navigate('RequestScreen', {
            data: data,
          });
        }}
        style={[
          styles.box,
          {
            height: data?.id === 2 ? windowWidth * 0.17 : windowHeight * 0.05,
            alignSelf: 'center',
            top: data?.id === 2 ? -14 : 0,
            backgroundColor: data?.id === 2 ? Color.white : '#F3F4F6',
          },
        ]}>
        <View
          style={[
            styles.image_Style,
            {
              height: data?.id === 2 ? windowWidth * 0.2 : windowHeight * 0.08,
              bottom: moderateScale(10, 0.6),
            },
          ]}>
          <CustomImage
            onPress={() => {
              navigationService.navigate('RequestScreen', {
                data: data,
              });
            }}
            style={{height: '100%', width: '100%', resizeMode: 'contain'}}
            source={data.image}
          />
        </View>
        <CustomText
          style={{
            fontSize: moderateScale(10, 0.6),
            color: Color.themeBlack,
            fontWeight: 'bold',
            position: 'absolute',
            top:
              data?.id === 2 ? moderateScale(40, 0.6) : moderateScale(15, 0.6),
          }}>
          {data.title}
        </CustomText>
      </TouchableOpacity>
    </>
  );
};

export default DeliveryBox;

const styles = StyleSheet.create({
  image_Style: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.23,
    position: 'absolute',
    bottom: moderateScale(10, 0.6),
  },
  imageFocused: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.23,
    position: 'absolute',
  },
  box: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
    marginRight: moderateScale(5, 0.6),
    borderRadius: moderateScale(10, 0.6),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderColor: Color.boxgrey,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  focusedBox: {
    width: windowWidth * 0.33,
    height: windowHeight * 0.4,
    marginRight: moderateScale(5, 0.6),
    borderRadius: moderateScale(15, 0.6),
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
    borderColor: Color.boxgrey,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
