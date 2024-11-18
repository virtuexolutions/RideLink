import React, {useState} from 'react';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {
  ActivityIndicator,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import navigationService from '../navigationService';
import {Icon} from 'native-base';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

const ChangePassword = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.back}>
        <Icon
          name="arrowleft"
          as={AntDesign}
          style={styles.icon2}
          color={Color.white}
          size={moderateScale(20, 0.3)}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </TouchableOpacity>
      <View
        style={styles.main_container}>
        <CustomText style={styles.txt5}>Change Password</CustomText>
        <View style={styles.text_input}>
          <TextInputWithTitle
            title={'current text *'}
            placeholder={'Current Password'}
            setText={setCurrPassword}
            value={currPassword}
            secureText={true}
            viewHeight={0.06}
            viewWidth={0.8}
            inputWidth={0.75}
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
            setText={setNewPassword}
            value={newPassword}
            secureText={true}
            viewHeight={0.06}
            viewWidth={0.8}
            inputWidth={0.75}
            border={1}
            borderRadius={moderateScale(30, 0.3)}
            borderColor={'#000'}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
          />

          <TextInputWithTitle
            title={'confirm new password *'}
            titleText={'Confirm your new password'}
            placeholder={'Confirm your new password'}
            setText={setConfirmNewPassword}
            value={confirmNewPassword}
            secureText={true}
            viewHeight={0.06}
            viewWidth={0.8}
            inputWidth={0.75}
            border={1}
            borderRadius={moderateScale(30, 0.3)}
            borderColor={'#000'}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
          />

          <CustomButton
            onPress={() => navigationService.navigate('LoginScreen')}
            text={'RESET'}
            fontSize={moderateScale(12, 0.3)}
            textColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.8}
            height={windowHeight * 0.065}
            marginTop={moderateScale(20, 0.3)}
            bgColor={Color.themeBlack}
            isBold
            elevation
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ChangePassword;
const styles = ScaledSheet.create({
  main_container:{
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent:'center'
  },
  txt5: {
    textAlign:'center',
    fontSize: moderateScale(24, 0.6),
    fontWeight: 'bold',
    width: windowWidth * 0.85,
    color: Color.themeBlack,
    marginVertical:moderateScale(25,.3)
  },
  text_input: {
    alignItems: 'center',
    borderWidth: 1,
    width: windowWidth * 0.9,
    borderColor: Color.mediumGray,
    height: windowHeight * 0.47,
    borderRadius: 20,
    paddingTop: windowHeight * 0.03 ,
  },
  back: {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    position: 'absolute',
    left: moderateScale(10, 0.6),
    top: moderateScale(10, 0.6),
    zIndex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: Color.themeBlack,
    justifyContent: 'center',
  },
});
