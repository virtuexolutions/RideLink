import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import PaymentMethodCard from '../Components/PaymentMethodCard';
import CreditCardComponent from '../Components/CreditCardComponent';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';

const PaymentScreen = props => {
  const nearestcab = props?.route?.param?.Nearestcab;
  const fare = props?.route?.params?.fare;
  const payment_method = props?.route?.params?.paymentMethod;

  return (
    <SafeAreaView style={styles.safe_area}>
      <Header title={'Offer Your Fare'} />
      <View style={styles.main_view}>
        <PaymentMethodCard
          paymentMethod={payment_method}
          isEnabled={nearestcab}
        />
        <CreditCardComponent />
        <CustomText isBold style={styles.heading}>
          Details
        </CustomText>
        <View style={styles.card}>
          <View style={[styles.text_view, {marginTop: 0}]}>
            <CustomText style={styles.heading_text}>Sub Total</CustomText>
            <CustomText style={styles.text}>{`$${fare}`}</CustomText>
          </View>
          <View style={styles.text_view}>
            <CustomText style={styles.heading_text}>Sub Total</CustomText>
            <CustomText style={styles.text}>{`$${fare}`}</CustomText>
          </View>
          <View style={styles.text_view}>
            <CustomText style={styles.heading_text}>Sub Total</CustomText>
            <CustomText style={styles.text}>{`$${fare}`}</CustomText>
          </View>
        </View>
        <View style={styles.text_view}>
          <CustomText isBold style={[styles.heading, {marginTop: 0}]}>
            Total
          </CustomText>
          <CustomText style={styles.text}>{`$${fare}`}</CustomText>
        </View>
        <CustomButton
          width={windowWidth * 0.9}
          height={windowHeight * 0.075}
          bgColor={Color.themeBlack}
          borderRadius={moderateScale(30, 0.3)}
          textColor={Color.white}
          textTransform={'none'}
          text={'PAY NOW'}
          marginTop={moderateScale(25, 0.6)}
          marginBottom={moderateScale(10, 0.6)}
          onPress={() => navigationService.navigate('RateScreen')}
        />
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
    height: windowHeight * 0.15,
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
    marginTop: moderateScale(15, 0.6),
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(20, 0.6),
  },
  heading: {
    fontSize: moderateScale(16, 0.6),
    color: Color.grey,
    marginTop: moderateScale(15, 0.6),
  },
  text_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(10, 0),
  },
  text: {
    fontSize: moderateScale(14, 0.6),
    Color: Color.black,
    fontWeight: '700',
  },
  heading_text: {
    fontSize: moderateScale(14, 0.6),
    color: Color.black,
  },
});
