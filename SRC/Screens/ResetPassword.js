import React, { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';

import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Icon } from 'native-base';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { forgotpassword } from '../Constant/schema';
import Header from '../Components/Header';

const ResetPassword = props => {
  const dispatch = useDispatch();
  const email = props?.route?.params?.email;

  const navigationN = useNavigation();
  const [password, setPassword] = useState('');
  const [ConfirmPass, setConfirmPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async values => {
    const url = 'password/reset';
    const data = {
      email: email,
      password: values.password,
      confirm_password: values.confirmPassword,
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
  
        <View style={styles.main_container}>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
       <Header
        headerColor={'transparent'}
        // title={'Change Password'}
        showBack={true}
        hideUser={true}
      />
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
          <Formik
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
            validationSchema={forgotpassword}
            onSubmit={resetPassword}>
            {({values, handleChange, handleSubmit, touched, errors}) => {
              return (
                <View style={styles.text_input}>
                  <TextInputWithTitle
                    title={'new password *'}
                    titleText={'New Password'}
                    placeholder={'New Password'}
                    setText={handleChange('password')}
                    value={values.password}
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
                  {touched.password && errors.password && (
                    <CustomText style={styles.schemaText}>
                      {errors.password}
                    </CustomText>
                  )}
                  <TextInputWithTitle
                    title={'new password *'}
                    titleText={'New Password'}
                    placeholder={'New Password'}
                    setText={handleChange('confirmPassword')}
                    value={values.confirmPassword}
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
                  {touched.password && errors.password && (
                    <CustomText style={styles.schemaText}>
                      {errors.password}
                    </CustomText>
                  )}
                  <CustomButton
                    text={
                      isLoading ? (
                        <ActivityIndicator size={'small'} color={Color.white} />
                      ) : (
                        'Reset'
                      )
                    }
                    textColor={Color.white}
                    width={windowWidth * 0.8}
                    height={windowHeight * 0.065}
                    marginTop={moderateScale(20, 0.3)}
                    onPress={handleSubmit}
                    borderRadius={30}
                    bgColor={Color.themeBlack}
                  />
                </View>
              );
            }}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
  
  );
};

const styles = ScaledSheet.create({
 
    main_container: {
    height: windowHeight,
    width: windowWidth,
    // alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: windowHeight * 0.03,
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

  text_input: {
    alignItems: 'center',
    borderWidth: 1,
    width: windowWidth * 0.9,
    borderColor: Color.mediumGray,
    paddingVertical: moderateScale(10, 0.6),
    borderRadius: 20,
    paddingTop: windowHeight * 0.03,
    paddingHorizontal: moderateScale(30, 0.6),
  },
  container: {
    paddingBottom: moderateScale(20, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop : windowHeight*0.15,
    // height: windowHeight,
  },
  schemaText: {
    fontSize: moderateScale(10, 0.6),
    color: Color.red,
    alignSelf: 'flex-start',
  },
});

export default ResetPassword;
