import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ImagePickerModal from '../Components/ImagePickerModal';
import ScreenBoiler from '../Components/ScreenBoiler';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {setUserToken} from '../Store/slices/auth-slice';
import {windowHeight, windowWidth} from '../Utillity/utils';
import { Icon } from 'native-base';
import Feather from 'react-native-vector-icons/Feather'
import Home from './Home';


const Signup = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  const [ term ,setTerm] = useState(false)
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
            height: windowHeight * 0.1,
            width: windowHeight * 0.2,
            marginTop:windowHeight*0.04,
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

        <View style={styles.input_container}>
          <TextInputWithTitle
            title={'name *'}
            titleText={'Username'}
            placeholder={'name'}
            setText={setUserName}
            value={username}
            viewHeight={0.06}
            viewWidth={0.85}
            inputWidth={0.8}
            border={1}
            borderRadius={30}
            backgroundColor={'transparent'}
            borderColor={Color.lightGrey}
            marginTop={moderateScale(10, 0.3)}
            placeholderColor={Color.mediumGray}
          />
          <TextInputWithTitle
            title={'email Id *'}
            titleText={'Username'}
            placeholder={'Email '}
            setText={setEmail}
            value={email}
            viewHeight={0.06}
            viewWidth={0.85}
            inputWidth={0.8}
            border={1}
            borderRadius={30}
            backgroundColor={'transparent'}
            borderColor={Color.lightGrey}
            marginTop={moderateScale(10, 0.3)}
            placeholderColor={Color.mediumGray}
          />
          <TextInputWithTitle
            title={'contact * '}
            titleText={'Username'}
            placeholder={'phone number'}
            setText={setEmail}
            value={email}
            viewHeight={0.06}
            viewWidth={0.85}
            inputWidth={0.8}
            border={1}
            borderRadius={30}
            backgroundColor={'transparent'}
            borderColor={Color.lightGrey}
            marginTop={moderateScale(10, 0.3)}
            placeholderColor={Color.mediumGray}
          />
          <TextInputWithTitle
            title={'password *'}
            placeholder={'password'}
            setText={setPassword}
            value={password}
            viewHeight={0.06}
            viewWidth={0.85}
            inputWidth={0.8}
            border={1}
            borderRadius={30}
            backgroundColor={'transparent'}
            borderColor={Color.lightGrey}
            marginTop={moderateScale(10, 0.3)}
            // color={Color.white}
            placeholderColor={Color.mediumGray}
          />
          <View style={styles.row}>
            <TouchableOpacity  onPress={()=>{
              setTerm(!term)
            }}style={styles.check_box}>
             {term && <Icon as={Feather} size={moderateScale(15,.6)} color={Color.themeBlack} name='check'/>
            }</TouchableOpacity>
            <CustomText style={styles.term_text}>
              By Click You Agree To Our<CustomText style={{fontSize:moderateScale(11,.6), color:'red'}}> terms & conditions </CustomText>  As Well As Our
              <CustomText style={{fontSize:moderateScale(11,.6), color:'red'}}> Privacy Policy.</CustomText>
            </CustomText>
          </View>
          <CustomButton
          
            text={'sign in '}
            fontSize={moderateScale(14, 0.3)}
            textColor={Color.white}
            borderWidth={1.5}
            borderColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.8}
            marginTop={moderateScale(10,.3)}
            height={windowHeight * 0.075}
            bgColor={Color.btn_Color}
            textTransform={'capitalize'}
            elevation
            // isBold
          />
        </View>

        <CustomText style={styles.do_text}>
          Already have an account?
          <CustomText onPress={() =>{
            navigation.navigate('LoginScreen')
          }} isBold style={styles.Sign_text}>
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
    borderRadius: 2,marginTop:moderateScale(2,.3)
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
  term_text:{
    paddingHorizontal:moderateScale(5,.6),
    fontSize:moderateScale(11,.6)
  }
});

export default Signup;
