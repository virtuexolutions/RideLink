import {Icon} from 'native-base';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import {setWalkThrough} from '../Store/slices/auth-slice';
import {windowHeight, windowWidth} from '../Utillity/utils';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';


const WalkThroughScreen = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const slidesref =useRef(null)
  const slides = [
    {
      key: '1',
      image: require('../Assets/Images/walk1.jpg'),
      title: 'Easy Ride Booking & Tracking',
      text: 'Book your ride in seconds and travel with confidence. Track your driver’s location, route, and arrival time in real-time, ensuring a safe and transparent journey every time.',
    },
    {
      key: '2',
      image: require('../Assets/Images/walk2.jpg'),
      title: 'Quick & Secure Parcel Delivery',
      text: `Send anything, anytime. From important documents to special gifts, Ridelynk ensures your parcels reach their destination safely, quickly, and without hassle.`,
    },
    {
      key: '3',
      image: require('../Assets/Images/walk3.jpg'),
      title: 'Comfortable Pet Transportation',
      text: `Because pets are family too! We provide safe, stress-free rides for your furry friends—whether it’s a vet visit, grooming session, or a fun trip.`,
    },
  ];
  // console.log(slidesref.current ,'indexxxxxxx')

  const RenderSlider = ({item}) => {
    return (
        <ImageBackground
        imageStyle={{
          height:'90%',
          width:'100%'
        }}
      resizeMode='stretch'
          style={{
            width: windowWidth,
            height: windowHeight,
            backgroundColor : 'white'
                    }}
          source={item.image}>
            <CustomText style={{
              fontSize : moderateScale(11,.6),
              position:'absolute',
              bottom:'46%',
              width:'80%',
              textAlign:'center',
              marginHorizontal:moderateScale(50,.3)
            }}>{item?.text}</CustomText>
          
        </ImageBackground>
    );
  };

  const RenderNextBtn = ({onPress}) => {
    return (
      <TouchableOpacity 
      onPress={onPress}
    style={{
          height: windowHeight * 0.09,
          width: windowHeight * 0.09,
          borderRadius: (windowHeight * 0.09) / 2,
          backgroundColor: 'white',
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: Color.black,
          bottom: 10,
          alignSelf : 'center'
        }}>
       <CustomText style={{
        fontSize : moderateScale(14,0.6)
       }} >NEXT</CustomText>
      </TouchableOpacity>
    );
  };
  const RenderDoneBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnRight]}>
        Done
      </CustomText>
    );
  };
  const RenderSkipBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));

        }}
        style={[styles.generalBtn, styles.btnLeft]}>
        Skip
      </CustomText>
    );
  };

  return (

      <View style={styles.container1}>
     
        <AppIntroSlider
          renderItem={RenderSlider}
          data={slides}
          ref={slidesref}

        renderPagination={(activeindex)=>{
          console.log('activeeeeeee ,index ' ,activeindex) 

          return(

            <View style={{
              width : windowWidth ,
              height : windowHeight * 0.21,
              backgroundColor : 'transparent',
              position : 'absolute',
              bottom : '23%',
              rowGap : moderateScale(35,0.6),
            }}>
              <RenderSkipBtn />
              <RenderNextBtn onPress={() => {
              if (slidesref.current) {
                if (activeindex < slides.length - 1) {
                  slidesref.current.goToSlide(activeindex + 1, true); 
                } else {
                  dispatch(setWalkThrough(true)); 
                }}}}
                />
            </View>
          )
        }}
      
          showNextButton={true}
          activeDotStyle={{backgroundColor: Color.themeBlack}}
          dotStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: Color.themeBlack,
          }}
      
        />

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  container1: {
    height:windowHeight,
    width:windowWidth,
    backgroundColor:'white'
  },
  bgImage: {
    flex: 1,
  },
  SliderContainer: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  title: {
    color: Color.themeColor2,
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
    width: windowWidth * 0.8,
    marginTop: windowHeight * 0.065,
  },
  subcontainer: {
    width: windowWidth,
    height: windowHeight * 0.55,
    backgroundColor: Color.green,
    borderTopLeftRadius: moderateScale(35, 0.3),
    borderTopRightRadius: moderateScale(35, 0.3),
  },
  subText: {
    color: Color.themeColor2,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
    width: windowWidth * 0.8,
    marginTop: moderateScale(10, 0.3),
  },
  generalBtn: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
  },
  btnLeft: {
    color: Color.themeBlack,
  },
  btnRight: {
    color: Color.white,
  },
});

export default WalkThroughScreen;
const BoldText = ({children}) => {
  return <Text style={{fontWeight: 'bold'}}>{children}</Text>;
};
