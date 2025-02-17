import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Header';
import {Icon} from 'native-base';
// import { Header } from 'react-native/Libraries/NewAppScreen'
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';

const ChooseDeclineReasonScreen = ({}) => {
  const {user_type} = useSelector(state => state.authReducer);
  console.log('🚀 ~ ChooseDeclineReasonScreen ~ user_type:', user_type);
  const array = [
    {id: 1, reason: 'Price too High', checked: true},
    {id: 2, reason: 'Long Wait Time', checked: true},
    {id: 3, reason: 'Poor Vehicle Condition', checked: true},
    {id: 4, reason: 'Safety Concerns', checked: true},
    {id: 5, reason: 'Inconvenient Payment Options', checked: true},
    {id: 6, reason: 'Negative Past Experience', checked: true},
    {id: 7, reason: 'Preference for Ride-Hailing Apps', checked: true},
    {id: 8, reason: 'Unfamiliarity with the Service', checked: true},
    {id: 9, reason: 'Route Concerns', checked: true},
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState({});
  console.log(
    '🚀 ~ ChooseDeclineReasonScreen ~ reason:',
    reason?.some(data => data?.id),
  );

  const rideCancel = async () => {
    const body = {
      ride_id: 1,
      status: 'cancel',
      reason: reason?.reason,
    };
    const url = `auth/customer/ride_update/${data?.ride_id}`;
    setIsLoading(true);
    const response = await Post(url, {status: 'cancel'}, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      user_type == 'Rider'
        ? navigationService.navigate('Home')
        : navigationService.navigate('MapScreen', {
            ridedata: data,
            fromrideScreen: true,
          });
    }
  };

  return (
    <SafeAreaView>
      <Header
        headerColor={'transparent'}
        title={'Chooose Decline Reason'}
        showBack={true}
      />
      <View style={styles.mainView}>
        {array?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setReason(item);
              }}
              style={[
                styles.reasons,
                {
                  backgroundColor:
                    reason?.id == item?.id ? 'red' : 'transparent',
                },
              ]}>
              <CustomText
                style={{color: Color.grey, fontSize: moderateScale(12, 0.2)}}>
                {item.reason}
              </CustomText>
              <Icon name={'check'} as={AntDesign} />
            </TouchableOpacity>
          );
        })}
        <CustomButton
          text={'Submit'}
          fontSize={moderateScale(15, 0.3)}
          textColor={Color.white}
          borderColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.9}
          height={windowHeight * 0.07}
          bgColor={Color.darkBlue}
          isBold
          marginTop={moderateScale(32, 0.3)}
          onPress={() => {
            rideCancel();
            // navigationService.navigate('RecieptScreen', {
            //   type: 'fromDecline',
            // });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChooseDeclineReasonScreen;

const styles = StyleSheet.create({
  mainView: {
    width: windowWidth,
    height: windowHeight * 0.9,
  },
  reasons: {
    // overflow:'hidden',
    width: windowWidth,
    paddingHorizontal: 15,
    marginTop: moderateScale(21, 0.2),
    alignItems: 'center',
    // paddingLeftt: moderateScale(22,0.2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
