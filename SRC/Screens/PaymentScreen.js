import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import PaymentMethodCard from '../Components/PaymentMethodCard';

const PaymentScreen = () => {
  return (
    <SafeAreaView style={styles.safe_area}>
      <Header title={'Offer Your Fare'} />
      <View style={styles.main_view}>
        <PaymentMethodCard />
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  safe_area: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.white,
  },
  main_view: {
    paddingVertical: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(20, 0.6),
    height: windowHeight,
    width: windowWidth,
  },
  card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.25,
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderRadius: moderateScale(20, 0.6),
  },
});
