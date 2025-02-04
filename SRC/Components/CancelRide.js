import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import CustomImage from './CustomImage'
import CustomText from './CustomText'
import CustomButton from './CustomButton'
import navigationService from '../navigationService'

const CancelRide = () => {
  return (
    <Modal
    swipeDirection="up"
    transparent
    visible={modal_visibe}
    style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: windowWidth * 0.8,
          height: windowHeight * 0.35,
          backgroundColor: Color.white,
          borderRadius: moderateScale(20, 0.6),
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: moderateScale(12, 0.6),
        }}>
        <View
          style={{
            height: windowHeight * 0.12,
            width: windowWidth * 0.3,
            marginBottom: moderateScale(20, 0.6),
          }}>
          <CustomImage
            style={{width: '100%', height: '100%'}}
            source={require('../Assets/Images/sad_face.png')}
          />
        </View>
        <CustomText
          isBold
          style={{fontSize: moderateScale(15, 0.6), textAlign: 'center'}}>
          we're so sad about your cancellation
        </CustomText>
        <CustomText
          style={{
            fontSize: moderateScale(12, 0.6),
            textAlign: 'center',
            color: Color.grey,
          }}>
          we will continue to improve our services & satisfy on the next
          trip
        </CustomText>
        <CustomButton
          text={'go back to Home'}
          textColor={Color.white}
          width={windowWidth * 0.6}
          height={windowHeight * 0.05}
          bgColor={Color.cartheme}
          borderColor={Color.white}
          borderWidth={1}
          marginTop={moderateScale(20, 0.6)}
          borderRadius={moderateScale(30, 0.3)}
        //   isGradient
        //   onPress={() => navigationService.navigate('')}
        />
      </View>
    </View>
  </Modal>
  )
}

export default CancelRide

const styles = StyleSheet.create({})