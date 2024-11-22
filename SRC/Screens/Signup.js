import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ImagePickerModal from '../Components/ImagePickerModal';
import ScreenBoiler from '../Components/ScreenBoiler';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {windowHeight, windowWidth} from '../Utillity/utils';

const Signup = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  const [term, setTerm] = useState(false);
  const {user_type} = useSelector(state => state.authReducer);
  console.log(user_type, 'userrtypeeeeee');

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <ScrollView
        style={{
          height: windowHeight,
          width: windowWidth,
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: moderateScale(90, 0.6),
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: windowHeight * 0.15,
            width: windowHeight * 0.25,
            marginTop: windowHeight * 0.04,
          }}>
          <CustomImage
            resizeMode="contain"
            source={require('../Assets/Images/logo.png')}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <CustomText isBold style={styles.text}>
          Sign up
        </CustomText>

        <View
          style={[
            user_type === 'driver' ? styles.fields_box : styles.input_container,
          ]}>
          <TextInputWithTitle
            title={'name *'}
            placeholder={'James W. Brown'}
            setText={setUserName}
            value={username}
            viewHeight={user_type === 'driver' ? 0.055 : 0.06}
            viewWidth={user_type === 'driver' ? 0.82 : 0.85}
            inputWidth={0.8}
            border={1}
            borderRadius={30}
            backgroundColor={'transparent'}
            borderColor={Color.lightGrey}
            marginTop={moderateScale(8, 0.3)}
            placeholderColor={Color.mediumGray}
            titleStlye={{right: 10}}
          />
          <TextInputWithTitle
            title={'email Id *'}
            titleText={'Username'}
            placeholder={'Email '}
            setText={setEmail}
            value={email}
            viewHeight={user_type === 'driver' ? 0.055 : 0.06}
            viewWidth={user_type === 'driver' ? 0.82 : 0.85}
            inputWidth={0.8}
            border={1}
            borderRadius={30}
            backgroundColor={'transparent'}
            borderColor={Color.lightGrey}
            marginTop={moderateScale(8, 0.3)}
            placeholderColor={Color.mediumGray}
            titleStlye={{right: 10}}
          />
          <TextInputWithTitle
            title={'contact * '}
            titleText={'Username'}
            placeholder={'phone number'}
            setText={setEmail}
            value={email}
            viewHeight={user_type === 'driver' ? 0.055 : 0.06}
            viewWidth={user_type === 'driver' ? 0.82 : 0.85}
            inputWidth={0.8}
            border={1}
            borderRadius={30}
            backgroundColor={'transparent'}
            borderColor={Color.lightGrey}
            marginTop={moderateScale(8, 0.3)}
            placeholderColor={Color.mediumGray}
            titleStlye={{right: 10}}
          />
          <TextInputWithTitle
            title={'password *'}
            placeholder={'password'}
            setText={setPassword}
            value={password}
            viewHeight={user_type === 'driver' ? 0.055 : 0.06}
            viewWidth={user_type === 'driver' ? 0.82 : 0.85}
            inputWidth={0.8}
            border={1}
            borderRadius={30}
            backgroundColor={'transparent'}
            borderColor={Color.lightGrey}
            marginTop={moderateScale(8, 0.3)}
            // color={Color.white}
            placeholderColor={Color.mediumGray}
            titleStlye={{right: 10}}
          />
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                setTerm(!term);
              }}
              style={styles.check_box}>
              {term && (
                <Icon
                  as={Feather}
                  size={moderateScale(15, 0.6)}
                  color={Color.themeBlack}
                  name="check"
                />
              )}
            </TouchableOpacity>
            <CustomText style={styles.term_text}>
              By Click You Agree To Our
              <CustomText
                style={{fontSize: moderateScale(11, 0.6), color: 'red'}}>
                {' '}
                terms & conditions{' '}
              </CustomText>{' '}
              As Well As Our
              <CustomText
                style={{fontSize: moderateScale(11, 0.6), color: 'red'}}>
                {' '}
                Privacy Policy.
              </CustomText>
            </CustomText>
          </View>
          <CustomButton
            text={'sign in '}
            fontSize={moderateScale(14, 0.3)}
            textColor={Color.white}
            borderWidth={1.5}
            borderColor={user_type === 'driver' ? Color.darkBlue : Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.8}
            marginTop={moderateScale(10, 0.3)}
            height={windowHeight * 0.075}
            bgColor={user_type === 'driver' ? Color.darkBlue : Color.btn_Color}
            textTransform={'capitalize'}
            elevation
            // isBold
          />
        </View>

        <CustomText style={styles.do_text}>
          Already have an account?
          <CustomText
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}
            isBold
            style={styles.Sign_text}>
            {' '}
            Sign in
          </CustomText>
        </CustomText>

        <ImagePickerModal
          show={imagePicker}
          setShow={setImagePicker}
          setFileObject={setImage}
        />
      </ScrollView>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(22, 0.6),
    color: Color.themeBlack,
    paddingVertical: moderateScale(10, 0.6),
  },
  fields_box: {
    borderWidth: 0.3,
    borderColor: '#28272369',
    borderRadius: 20,
    height: windowHeight * 0.6,
    width: windowWidth * 0.9,
    alignItems: 'center',
    paddingTop: moderateScale(15, 0.6),
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  input_container: {
    borderWidth: 1,
    borderColor: Color.mediumGray,
    borderRadius: 20,
    height: windowHeight * 0.65,
    width: windowWidth * 0.9,
    alignItems: 'center',
    paddingTop: moderateScale(15, 0.6),
  },
  row: {
    flexDirection: 'row',
    paddingVertical: moderateScale(15, 0.6),
    width: '85%',
  },
  check_box: {
    height: windowHeight * 0.02,
    width: windowWidth * 0.04,
    borderWidth: 1,
    borderColor: Color.black,
    borderRadius: 2,
    marginTop: moderateScale(2, 0.3),
  },
  do_text: {
    paddingVertical: moderateScale(35, 0.6),
    textTransform: 'none',
    letterSpacing: 1,
  },
  Sign_text: {
    color: Color.themeBlack,
    paddingRight: moderateScale(5, 0.6),
  },
  term_text: {
    paddingHorizontal: moderateScale(5, 0.6),
    fontSize: moderateScale(11, 0.6),
  },
});

export default Signup;
