import React, {useState} from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText'
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';

import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import { Post } from '../Axios/AxiosInterceptorFunction';

const ResetPassword = props => {
  const dispatch = useDispatch();
  const navigationN = useNavigation();
  const [password, setPassword] = useState('');
  const [ConfirmPass, setConfirmPass] = useState('');
  const [isLoading ,setIsLoading] = useState(false)


  
  const resetPassword = async () => {
    const url = 'password/reset';
    const data = {
      email: email,
      password: password,
      confirm_password: ConfirmPass,
    };
    setIsLoading(true);
    const response = await Post(url, data, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      console.log('response data =>', response?.data);
      Platform.OS == 'android'
        ? ToastAndroid.show(`Password Reset SuccessFully`, ToastAndroid.SHORT)
        : alert(`Password Reset SuccessFully`);
      navigationN.navigate('LoginScreen');
    }
  };



  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <View style={styles.main_container}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.back}>
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            size={moderateScale(22, 0.3)}
            color={Color.white}
            onPress={() => {
              navigationN.goBack();
            }}
          />
        </TouchableOpacity>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <CustomText isBold style={styles.txt2}>
            Forget Password
          </CustomText>
          <CustomText style={styles.txt3}>
            Forgot your password ? don't worry, jsut take a simple step and
            create your new password!
          </CustomText>

          <View style={styles.text_input}>
            <TextInputWithTitle
              title={'new password *'}
              titleText={'New Password'}
              placeholder={'New Password'}
              setText={setPassword}
              value={password}
              secureText={true}
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.55}
              border={1}
              borderRadius={moderateScale(30, 0.3)}
              borderColor={'#000'}
              backgroundColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
            />
            <TextInputWithTitle
              title={'new password *'}
              titleText={'New Password'}
              placeholder={'New Password'}
              setText={setConfirmPass}
              value={ConfirmPass}
              secureText={true}
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.7}
              border={1}
              borderRadius={moderateScale(30, 0.3)}
              borderColor={'#000'}
              backgroundColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
            />
            <CustomButton
              text={'Reset'}
              textColor={Color.white}
              width={windowWidth * 0.8}
              height={windowHeight * 0.065}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                navigationN.navigate('LoginScreen')
              }}
              borderRadius={30}
              bgColor={Color.themeBlack}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  main_container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'white',
  },
  txt2: {
    color: Color.black,
    fontSize: moderateScale(24, 0.6),
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
    width: '80%',
    marginVertical: moderateScale(10, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },
  back:{
    position: 'absolute',
    top: moderateScale(20, 0.3),
    left: moderateScale(20, 0.3),
    height: moderateScale(30, 0.3),
    width: moderateScale(30, 0.3),
    borderRadius: moderateScale(5, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.themeBlack,
    zIndex: 1,
  },
  text_input: {
    alignItems: 'center',
    borderWidth: 1,
    width: windowWidth * 0.9,
    borderColor: Color.mediumGray,
    height: windowHeight * 0.36,
    borderRadius: 20,
    paddingTop: windowHeight * 0.03,
  },
  container:{
    paddingBottom: moderateScale(20, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: windowHeight,
  }
});

export default ResetPassword;
