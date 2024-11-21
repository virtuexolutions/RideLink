import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import AskLocation from '../Components/AskLocation';
import navigationService from '../navigationService';

const RequestScreen = () => {
  const cablist = [
    {
      id: 1,
      name: 'X Regular',
      price: '$ 30.00',
    },
    {
      id: 2,
      name: 'X Regular',
      price: '$ 30.00',
    },
    {
      id: 3,
      name: 'X Regular',
      price: '$ 30.00',
    },
    {
      id: 4,
      name: 'X Regular',
      price: '$ 30.00',
    },
  ];

  const [completePayment, setCompletePayment] = useState(false);

  return (
    <SafeAreaView style={styles.safearea_view}>
      <ImageBackground
        style={styles.background_view}
        source={require('../Assets/Images/Map.png')}>
        <View style={{position: 'absolute', bottom: 20, alignItems: 'center'}}>
          <FlatList
            horizontal
            data={cablist}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={styles.cab_view}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: moderateScale(10, 0.6),
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View>
                      <CustomText style={styles.text}>{item?.name}</CustomText>
                      <CustomText style={styles.price}>
                        {item?.price}
                      </CustomText>
                      <TouchableOpacity style={styles.btn}>
                        <CustomText style={styles.btn_text}>
                          Book Ride
                        </CustomText>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.image_view}>
                      <CustomImage
                        resizeMode="contain"
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        source={require('../Assets/Images/car.png')}
                      />
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <AskLocation heading={'Where are you Going?'} isIcon islocation />
          {/* <View style={styles.location_View}>
            <View style={styles.location_subview}>
              <CustomText style={styles.location_head}>
                Where are you Going
              </CustomText>
              <View style={styles.icon_view}>
                <Icon
                  name="keyboard-arrow-down"
                  as={MaterialIcons}
                  size={moderateScale(12, 0.6)}
                  color={Color.black}
                />
              </View>
            </View>
            <View style={styles.seatView}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: moderateScale(5, 0.6),
                  }}>
                  <Icon
                    name="map-marker"
                    as={FontAwesome}
                    size={moderateScale(16, 0.6)}
                    color={Color.yellow}
                  />
                  <CustomText
                    style={[
                      styles.text1,
                      {
                        paddingBottom: moderateScale(10, 0.6),
                      },
                    ]}>
                    {'284 Long Street Gainesville'}
                  </CustomText>
                </View>
                <CustomText
                  isBold
                  style={[
                    styles.text1,
                    {
                      position: 'absolute',
                      color: 'black',
                      top: 25,
                      marginLeft: moderateScale(-5, 0.6),
                      transform: [{rotate: '-90deg'}],
                    },
                  ]}>
                  -----
                </CustomText>
                <View
                  style={{
                    width: windowWidth * 0.75,
                    height: moderateScale(0.5, 0.5),
                    backgroundColor: Color.grey,
                    marginLeft: moderateScale(14, 0.6),
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: moderateScale(10, 0.6),
                  }}>
                  <Icon
                    name="map-marker"
                    as={FontAwesome}
                    size={moderateScale(16, 0.6)}
                    color={Color.red}
                  />
                  <CustomText style={styles.text1}>
                    {'I’m going to ....'}
                  </CustomText>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: -10,
                      marginTop: moderateScale(10, 0.6),
                    }}>
                    <Icon
                      name="plus"
                      as={FontAwesome}
                      size={moderateScale(12, 0.6)}
                      color={Color.black}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View> */}
          <CustomButton
            width={windowWidth * 0.9}
            height={windowHeight * 0.075}
            bgColor={Color.themeBlack}
            borderRadius={moderateScale(30, 0.3)}
            textColor={Color.white}
            textTransform={'none'}
            text={'CONFIRM NOW'}
            marginBottom={moderateScale(10, 0.6)}
          onPress={() => navigationService.navigate('FareScreen')}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  safearea_view: {
    width: windowWidth,
    height: windowHeight,
  },
  background_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
    paddingVertical: moderateScale(20, 0.6),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cab_view: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.7,
    backgroundColor: Color.white,
    marginHorizontal: moderateScale(10, 0.6),
    borderRadius: moderateScale(20, 0.6),
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#32C5FF3D',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingVertical: moderateScale(15, 0.6),
    marginBottom: moderateScale(40, 0.6),
  },
  image_view: {
    width: moderateScale(120, 0.6),
    height: moderateScale(100, 0.6),
  },
  text: {
    fontSize: moderateScale(18, 0.6),
    fontWeight: '700',
  },
  price: {
    fontSize: moderateScale(12, 0.6),
    color: '#22211D',
  },
  btn: {
    width: moderateScale(100, 0.6),
    height: moderateScale(40, 0.6),
    backgroundColor: Color.black,
    borderRadius: moderateScale(20, 0.6),
    marginTop: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    color: Color.white,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
  },
  location_View: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    backgroundColor: Color.lightGrey,
    bottom: 20,
    borderRadius: moderateScale(15, 0.6),
  },
  location_subview: {
    width: windowWidth * 0.9,
    height: moderateScale(50, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(15, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  location_head: {
    fontSize: moderateScale(12, 0.6),
    fontWeight: '600',
  },
  icon_view: {
    width: moderateScale(25, 0.6),
    height: moderateScale(25, 0.6),
    backgroundColor: Color.lightGrey,
    borderRadius: moderateScale(20, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatView: {
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(12, 0.6),
    flexDirection: 'row',
  },
  text1: {
    fontSize: moderateScale(9, 0.6),
    textAlign: 'center',
  },
});
