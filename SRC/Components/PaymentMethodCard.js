import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';

const PaymentMethodCard = () => {
  const [isPaymentCom, setPaymentCom] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Card');

  return (
    <View style={styles.card_view}>
      <CustomText style={styles.price}>$50</CustomText>
      <CustomText style={styles.text}>Payment Method</CustomText>
      <View style={styles.payment_view}>
        <View style={styles.payment_subview}>
          <TouchableOpacity
            onPress={() => setPaymentMethod('Card')}
            style={styles.check_box}>
            {paymentMethod === 'Card' && <View style={styles.dot} />}
          </TouchableOpacity>
          <CustomText style={styles.sub_text}>Credit Card</CustomText>
        </View>
        <View
          style={[
            styles.payment_subview,
            {marginLeft: moderateScale(10, 0.6)},
          ]}>
          <TouchableOpacity
            onPress={() => setPaymentMethod('Paypal')}
            style={styles.check_box}>
            {paymentMethod === 'Paypal' && <View style={styles.dot} />}
          </TouchableOpacity>
          <CustomText style={styles.sub_text}>Paypal</CustomText>
        </View>
      </View>
      <CustomText style={styles.des}>
        Automatically Accept The Nearest Drive For Your Fare
      </CustomText>
    </View>
  );
};

export default PaymentMethodCard;

const styles = StyleSheet.create({
  card_view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.24,
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    borderRadius: moderateScale(15, 0.6),
  },
  price: {
    fontSize: moderateScale(12, 0.6),
    fontWeight: '700',
    width: windowWidth * 0.8,
    height: moderateScale(22, 0.6),
    borderBottomWidth: 0.5,
    borderBottomColor: Color.black,
    marginBottom: moderateScale(15, 0.6),
  },
  text: {
    fontSize: moderateScale(14, 0.6),
    fontWeight: '600',
    color: Color.black,
  },
  payment_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: moderateScale(7, 0.6),
  },
  payment_subview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(5, 0.6),
  },
  check_box: {
    width: moderateScale(12, 0.6),
    height: moderateScale(12, 0.6),
    borderRadius: moderateScale(20, 0.6),
    borderWidth: 0.9,
    borderColor: Color.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  des: {
    fontSize: moderateScale(10, 0.6),
    color: Color.black,
    marginTop: moderateScale(20, 0.6),
  },
  sub_text: {
    fontSize: moderateScale(12, 0.6),
    fontWeight: '600',
    color: Color.black,
  },
  dot: {
    width: moderateScale(6, 0.6),
    height: moderateScale(6, 0.6),
    backgroundColor: Color.black,
    borderRadius: moderateScale(20, 0.6),
  },
});
