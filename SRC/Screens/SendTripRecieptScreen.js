import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import DropDownSingleSelect from './DropDownSingleSelect';
import CustomButton from '../Components/CustomButton';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const SendTripRecieptScreen = () => {
    const [selectedTime,setSelectedTime ] = useState('')
    const [passsengers, setPassengers ] = useState('')
    const [PaymentMethod, setPaymentMethod ] = useState('');
  const [timeVisible, setTimeVisible] = useState(false);


    const passengersArray =[
        "1 passengers",
        "2 passengers",
        "3 passengers",
        "4 passengers",
        "5 passengers",
    ];
    const paymentArray=[
        { id: '1', name:"Online", value: "stripe"},
        { id: '1', name:"Cash", value: "cod"},
    ]
  return (
    <SafeAreaView>
        <ScrollView contentContainerStyle={{
            paddingBottom:moderateScale(24,0.2)
        }}>
      <Header title={'Send Trip Reciept'} />
      <View style={styles.mainView}>
        <View style={styles.box}>
          <View style={styles.profileInfo}>
            <View style={styles.imageContainer}>
              <CustomImage
                style={styles.image}
                source={require('../Assets/Images/user1.png')}
              />
            </View>
            <CustomText style={styles.profileName}>
              Theodora J. Gardner
            </CustomText>
          </View>

          <View style={{ 

            marginTop: moderateScale(10, 0.6)}}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.Circle}>
                <Icon
                  style={{color: Color.white}}
                  as={FontAwesome5}
                  name="car"
                  size={moderateScale(6, 0.6)}
                />
              </View>
              <View style={{marginLeft: moderateScale(10, 0.6)}}>
                <CustomText style={styles.text1}>Pickup</CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(10, 0.6),
                    color: Color.themeBlack,
                    fontWeight: 'bold',
                  }}>
                  Fannie Street San Angelo, Texas
                </CustomText>
              </View>
            </View>
            <View style={styles.vert_dots}>
              <CustomText style={styles.dots}>.........</CustomText>
            </View>
            <View
              style={{flexDirection: 'row', marginTop: moderateScale(20, 0.6)}}>
              <View style={styles.Circle}>
                <Icon
                  style={{color: Color.white}}
                  as={FontAwesome5}
                  name="car"
                  size={moderateScale(6, 0.6)}
                />
              </View>
              <View style={{marginLeft: moderateScale(10, 0.6)}}>
                <CustomText style={styles.text1}>Drop Off</CustomText>
                <CustomText style={styles.text2}>
                  Neville Street Salem, Colorado
                </CustomText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.configView}>
        <View style={styles.configDetailView}>
            <View style={styles.configDetail}>
                <Icon
                name='calendar'
                as={Feather}
                color={Color.black}
                size={moderateScale(24,0.3)}
                />
                <CustomText isBold>
                    Booking Time
                </CustomText>
            </View>
<TouchableOpacity 
onPress={()=>{
    setTimeVisible(true)
}}
>
        <DropDownSingleSelect
                
                array={['4:00']}
                item={selectedTime}
                
                setItem={setSelectedTime}
                width={windowWidth * 0.3}
                // placeholder={'Ápproval for Admittance'}
                placeholder={'Set Your TIme'}
                dropdownStyle={{
                    // alignSelf:'flex',
                  borderBottomWidth: 0,
                  width: windowWidth * 0.3,
                //   backgroundColor:'black',
                //   marginRight:moderateScale(2,0.2),
                  marginTop: 10,
                }}
                btnStyle={{
                  backgroundColor: '#fff',
                  height: windowHeight * 0.045,
                }}
              />
</TouchableOpacity>
        </View>
        <View style={styles.configDetailView}>
            <View style={styles.configDetail}>
                <Icon
                name='user'
                as={Feather}
                color={Color.black}
                size={moderateScale(24,0.3)}
                />
                <CustomText isBold>
                    Passengers
                </CustomText>
            </View>
        <DropDownSingleSelect
                array={passengersArray}
                item={passsengers}
                setItem={setPassengers}
                width={windowWidth * 0.3}
                // placeholder={'Ápproval for Admittance'}
                placeholder={'Select Passengers'}
                dropdownStyle={{
                  borderBottomWidth: 0,
                  width: windowWidth * 0.3,
                  marginRight:moderateScale(3,0.2),
                  marginTop: 10,

                }}
                btnStyle={{
                  backgroundColor: '#fff',
                  height: windowHeight * 0.045,
                }}
              />
        </View>
        <View style={styles.configDetailView}>
            <View style={styles.configDetail}>
                <Icon
                name='dollar-sign'
                as={Feather}
                color={Color.black}
                size={moderateScale(24,0.3)}
                />
                <CustomText isBold>
                    Payment Method
                </CustomText>
            </View>
        <DropDownSingleSelect
                array={paymentArray}
                item={PaymentMethod}
                setItem={setPaymentMethod}
                width={windowWidth * 0.3}
                // placeholder={'Ápproval for Admittance'}
                placeholder={'Payment Method'}
                dropdownStyle={{
                  borderBottomWidth: 0,
                  width: windowWidth * 0.3,
                  marginRight:moderateScale(4,0.3),
                  marginTop: 10,
                }}
                btnStyle={{
                  backgroundColor: '#fff',
                  height: windowHeight * 0.045,
                }}
                // extreme
              />
        </View>
        </View>

        <View style={styles.expensesContainer}>
            <View style={styles.amountView}>
                <CustomText>Trip Fare Breakdown</CustomText>
                <CustomText>$50.25</CustomText>
            </View>
            <View style={styles.amountView}>
                <CustomText>Subtotal</CustomText>
                <CustomText>$50.25</CustomText>
            </View>
            <View style={styles.amountView}>
                <CustomText >Promo Code</CustomText>
                <CustomText>$5.25</CustomText>
            </View>
            <View style={[styles.amountView,{
                borderTopColor:'grey',
                borderTopWidth:0.2,
                marginTop:15
            }]}>
                <CustomText isBold style={{fontSize: moderateScale(24,0.4)}}>Total</CustomText>
                <CustomText isBold style={{fontSize: moderateScale(24,0.4)}}>$105.75</CustomText> {/* Resolved Design's calculations issues */}
            </View>
        </View>
      <View style={styles.statusImageView}>
        <CustomImage 
        resizeMode={'cover'}
        style={styles.logo}
        source={require('../Assets/Images/paid.png')}
        />
      </View>

      <CustomButton
            text={'Print'}
            fontSize={moderateScale(24, 0.3)}
            textColor={Color.white}
            borderWidth={1.5}
            borderColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.8}
            // marginTop={moderateScale(5, 0.3)}
            height={windowHeight * 0.075}
            bgColor={"#1877F2"}
            textTransform={'capitalize'}
            elevation
            isBold
          />
      <CustomButton
            text={'Share'}

            fontSize={moderateScale(24, 0.3)}
            textColor={Color.black}
            borderWidth={1.5}
            borderColor={"#1877F2"}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.8}
            marginTop={moderateScale(10, 0.3)}
            height={windowHeight * 0.075}
            bgColor={Color.white}
            textTransform={'capitalize'}
            elevation
            isBold
          />
      </View>


        </ScrollView>
        {/* {timeVisible ?  <RNDateTimePicker
       value={new Date()}
       
       mode="time"
       is24Hour={false}
       display="spinner"
       
       onChange={(e, time)=>{
        if(e?.type === 'set'){
          setSelectedTime(moment(time).format('hh:mm:ss A'))
          setTimeVisible(false)
         console.log('Time selected   ', moment(time).format('hh:mm:ss A'))
        }else{
          setTimeVisible(false)
        }
      }}
      /> : null} */}
    </SafeAreaView>
  );
};

export default SendTripRecieptScreen;

const styles = StyleSheet.create({
  mainView: {
    width: windowWidth,
    // height: windowHeight * 0.9,
    backgroundColor: Color.white,
  },
  imageContainer: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: (windowWidth * 0.2) / 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: moderateScale(14, 0.6),
    fontWeight: 'bold',
    color: Color.themeBlack,
    width: windowWidth * 0.45,
    marginLeft: moderateScale(13, 0.6),
  },
  profileInfo: {
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5, 0.4),
    borderBottomColor:'#a5a1a1',
    borderBottomWidth:0.2,
    paddingVertical:moderateScale(12,0.2)
  },
  box: {
    // height: windowHeight * 0.23,
    width: windowWidth * 0.89,
    // paddingHorizontal:moderateScale(15,0.6),
    backgroundColor: Color.white,
    // borderRadius: moderateScale(15, 0.6),
    alignSelf: 'center',
    marginTop: moderateScale(18, 0.6),
    // paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
  },
  text1: {
    fontSize: moderateScale(12, 0.6),
    color: Color.themeBlack,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
    color: Color.themeBlack,
    fontWeight: 'bold',
  },
  vert_dots: {
    transform: [{rotate: '90deg'}],
    // position: 'absolute',
    width: windowWidth * 0.15,
    top: moderateScale(10, 0.6),
    left: moderateScale(-12, 0.6),
  },
  dots: {color: Color.black, letterSpacing: 3},
  Circle: {
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
    borderRadius: (windowWidth * 0.04) / 2,
    backgroundColor: Color.themeBlack,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  configView:{
    paddingHorizontal:moderateScale(10,0.4)
  },
  configDetailView:{
    // width: windowWidth * 0.9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"space-between",
    borderBottomColor:Color.black,
    borderBottomWidth:1,
    // backgroundColor:'red',
    paddingHorizontal:moderateScale(12,0.3),
    paddingVertical: moderateScale(12,0.2),

  },
  configDetail:{
    flexDirection:'row',
    alignItems:'center',
    
    gap: moderateScale(11,0.3)
  },
  expensesContainer:{
      width: windowWidth * 0.99,
    //   backgroundColor:'green',
},
amountView:{
      paddingHorizontal:moderateScale(12,0.2),
    marginTop:moderateScale(12,0.2),
    width: windowWidth * 0.99,
    // paddingLeft: moderateScale(12,0.2),
    justifyContent:'space-between',
    // gap:moderateScale(300,.2),
    flexDirection:'row',

  },
  statusImageView:{
    // backgroundColor:'black',
    alignItems:'center'
  },
logo:{
    tintColor:'red',
    opacity:1,
}
});
