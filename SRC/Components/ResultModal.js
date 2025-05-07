import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import LottieView from 'lottie-react-native';
import {moderateScale} from 'react-native-size-matters';
import {mode} from 'native-base/lib/typescript/theme/tools';
import Color from '../Assets/Utilities/Color';

const ResultModal = ({isVisible, setIsVisible}) => {
  return (
    <Modal
      visible={isVisible}
      swipeDirection="up"
      transparent
      onBackdropPress={() => {
        setIsVisible(false);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(10, 5, 6, 0.19)',
        }}>
        <View
          style={{
            width: windowWidth * 0.8,
            backgroundColor: 'white',
            height: windowHeight * 0.35,
            alignItems: 'center',
            borderRadius: moderateScale(10, 0.6),
          }}>
          <View
            style={{
              // alignItems: 'center',
              height: moderateScale(180, 0.6),
              width: moderateScale(200, 0.6),
            }}>
            <LottieView
              autoPlay
              loop
              style={[
                {
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  alignSelf: 'center',
                },
              ]}
              source={require('../Assets/Images/waiting.json')}
            />
          </View>
          <CustomText
            style={{fontSize: moderateScale(15, 0.6), color: Color.darkBlue}}
            isBold>
            Waiting for Available Rider
          </CustomText>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;

const styles = StyleSheet.create({});
