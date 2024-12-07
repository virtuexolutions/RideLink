import {Icon} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';

const RideScreen = () => {
  const [additionalTime, setAdditionalTime] = useState(false);
  const {user_type} = useSelector(state => state.authReducer);
  const [start_waiting, setStartWaiting] = useState(null);
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigationService.navigate('PaymentScreen');
  //   }, 3000);
  // }, []);

  return (
    <SafeAreaView style={styles.safe_are}>
      <Header
        title={additionalTime ? 'Wait For Additional Time' : 'Waiting Pickup'}
      />
      <View style={styles.main_view}>
        <View style={[styles.map_view]}>
          <CustomImage
            source={require('../Assets/Images/map3.png')}
            styles={styles.image}
          />
        </View>
        {user_type === 'Rider' && start_waiting === true ? (
          <>
            <CustomButton
              text={'+ ADD ADDITIONAL TIME'}
              fontSize={moderateScale(14, 0.3)}
              textColor={Color.white}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.85}
              marginTop={moderateScale(10, 0.3)}
              height={windowHeight * 0.07}
              bgColor={Color.darkBlue}
              textTransform={'capitalize'}
              isBold
              onPress={() => setAdditionalTime(true)}
            />
            <CustomButton
              text={'DRIVE'}
              fontSize={moderateScale(14, 0.3)}
              textColor={Color.black}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.85}
              marginTop={moderateScale(10, 0.3)}
              height={windowHeight * 0.07}
              bgColor={Color.white}
              borderWidth={1.5}
              borderColor={Color.darkBlue}
              textTransform={'capitalize'}
              isBold
              onPress={() =>
                navigationService.navigate('PassengerDetails', {
                  type: 'passangerIdentity',
                })
              }
            />
          </>
        ) : (
          <>
            {additionalTime ? (
              <View
                style={[
                  styles.waiting_card,
                  {
                    height: windowHeight * 0.15,
                    bottom: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <CustomText isBold style={styles.time}>
                  01 : 59
                </CustomText>
              </View>
            ) : (
              <View
                style={{position: 'absolute', bottom: 80, alignSelf: 'center'}}>
                <View
                  style={[
                    styles.waiting_card,
                    {
                      height:
                        user_type === 'Rider'
                          ? windowHeight * 0.32
                          : windowHeight * 0.25,
                    },
                  ]}>
                  <View style={[styles.row_view, {justifyContent: 'center'}]}>
                    <CustomText style={styles.text_view}>
                      Waiting PickUp
                    </CustomText>
                    <Icon
                      name="cross"
                      as={Entypo}
                      size={moderateScale(18, 0.6)}
                      color={Color.veryLightGray}
                      style={{position: 'absolute', right: 0}}
                    />
                  </View>
                  <View style={styles.location_text_view}>
                    <Icon
                      name="map-marker-alt"
                      as={FontAwesome5}
                      size={moderateScale(14, 0.6)}
                      color={Color.veryLightGray}
                      style={{left: 5}}
                    />
                    <CustomText style={styles.text}>
                      Fannie Street San Angelo, Texas
                    </CustomText>
                  </View>
                  <View
                    style={[
                      styles.location_text_view,
                      {marginTop: moderateScale(10, 0.6)},
                    ]}>
                    <Icon
                      name="map-marker-alt"
                      as={FontAwesome5}
                      size={moderateScale(14, 0.6)}
                      color={Color.veryLightGray}
                      style={{left: 5}}
                    />
                    <CustomText style={styles.text}>
                      Neville Street Salem, Colorado
                    </CustomText>
                  </View>
                  <View
                    style={[
                      styles.row_view,
                      {marginTop: moderateScale(10, 0.6)},
                    ]}>
                    <TouchableOpacity
                      // onPress={() => setAdditionalTime(true)}
                      style={[styles.row_view, {justifyContent: 'flex-start'}]}>
                      <Icon
                        name="plus"
                        as={FontAwesome5}
                        color={Color.grey}
                        size={moderateScale(10, 0.6)}
                      />
                      <CustomText style={styles.text2}>
                        ADD ADDITIONAL TIME
                      </CustomText>
                    </TouchableOpacity>
                    <CustomText style={styles.text2}>CANCEL RIDE</CustomText>
                  </View>
                  <CustomButton
                    text={'PAY Now'}
                    fontSize={moderateScale(14, 0.3)}
                    textColor={Color.white}
                    borderRadius={moderateScale(30, 0.3)}
                    width={windowWidth * 0.85}
                    marginTop={moderateScale(10, 0.3)}
                    height={windowHeight * 0.07}
                    bgColor={Color.darkBlue}
                    textTransform={'capitalize'}
                    isBold
                    onPress={() => navigationService.navigate('PaymentScreen')}
                  />
                  {user_type === 'Rider' && (
                    <CustomButton
                      text={'ARRIVE LOCATION'}
                      fontSize={moderateScale(14, 0.3)}
                      textColor={Color.white}
                      borderRadius={moderateScale(30, 0.3)}
                      width={windowWidth * 0.85}
                      marginTop={moderateScale(10, 0.3)}
                      height={windowHeight * 0.07}
                      bgColor={Color.darkBlue}
                      textTransform={'capitalize'}
                      isBold
                    />
                  )}
                </View>
                {user_type === 'Rider' && (
                  <CustomButton
                    text={'START WAITING'}
                    fontSize={moderateScale(14, 0.3)}
                    textColor={Color.black}
                    borderRadius={moderateScale(30, 0.3)}
                    width={windowWidth * 0.85}
                    height={windowHeight * 0.07}
                    bgColor={Color.white}
                    borderWidth={1}
                    borderColor={Color.blue}
                    textTransform={'capitalize'}
                    style={{bottom: 60}}
                    isBold
                    onPress={() => setStartWaiting(true)}
                  />
                )}
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default RideScreen;

const styles = StyleSheet.create({
  safe_are: {
    width: windowWidth,
    height: windowHeight,
  },
  main_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
  },
  map_view: {
    height: windowHeight * 0.7,
    width: windowWidth,
    borderRadius: moderateScale(40, 0.6),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  waiting_card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.25,
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: moderateScale(20, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    bottom: 70,
  },
  text_view: {
    fontSize: moderateScale(15, 0.6),
    textAlign: 'center',
  },
  row_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  location_text_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: moderateScale(40, 0.6),
    borderWidth: 0.6,
    borderColor: Color.lightGrey,
    borderRadius: moderateScale(10, 0.6),
    marginTop: moderateScale(20, 0.6),
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    color: Color.veryLightGray,
    marginLeft: moderateScale(10, 0.6),
  },
  text2: {
    fontSize: moderateScale(12, 0.6),
    color: Color.black,
    marginLeft: moderateScale(5, 0.6),
    fontWeight: '600',
  },
  time: {
    fontSize: moderateScale(35, 0.6),
    color: Color.black,
    textAlign: 'center',
  },
});
