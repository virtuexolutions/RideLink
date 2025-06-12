import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from './CustomButton';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import TextInputWithTitle from './TextInputWithTitle';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ImagePickerModal from './ImagePickerModal';
import CustomImage from './CustomImage';
import {useSelector} from 'react-redux';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {date} from 'yup';
import database from '@react-native-firebase/database';
import navigationService from '../navigationService';

const RequestForDelivery = ({setRef, rbRef, item}) => {
  console.log('🚀 ~ RequestForDelivery ~ item:', item);
  const token = useSelector(state => state.authReducer.token);
  const [pickupEntrance, setPickupEnternce] = useState('');
  const [pickupAppartment, setPickupAppartment] = useState('');
  const [pickupFloor, setPickupFloor] = useState('');
  const [pickupDoorPhone, setPickupDoorPhone] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [reciverContact, setReciverContact] = useState('');
  const [pickupDetails, setPickupDetails] = useState('');
  const [reciverDetails, setreciverDetails] = useState('');
  const [destinationAppartment, setDestinationAppartment] = useState('');
  const [destinationFloor, setDestinationFloor] = useState('');
  const [destinationDoorPhone, setDestinationDoorPhone] = useState('');
  const [destinationEntrance, setDestinationEntrance] = useState('');
  const [image, setImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [delivery_Id, setDelivery_Id] = useState('');
  const [rideStatus, setRideStatus] = useState('');

  const deliveryRequest = async () => {
    const formData = new FormData();
    const body = {
      location_from: item?.pickupLocation?.name,
      location_to: item?.dropLocation?.name,
      pickup_location_lat: item?.pickupLocation?.lat,
      pickup_location_lng: item?.pickupLocation?.lng,
      destination_location_lat: item?.dropLocation?.lat,
      destination_location_lng: item?.dropLocation?.lng,
      amount: item?.fare,
      destination_apartment: destinationAppartment,
      destination_door_phone: destinationDoorPhone,
      destination_entrance: destinationEntrance,
      destination_floor: destinationFloor,
      pickup_apartment: pickupAppartment,
      pickup_floor: pickupFloor,
      pickup_door_phone: pickupDoorPhone,
      pickup_entrance: pickupEntrance,
      pickup_contact: senderContact,
      destination_contact: reciverContact,
      destination_details: reciverDetails,
      pickup_details: pickupDetails,
      payment_method: paymentMethod,
      category: item?.data?.title,
      type: item?.data?.title,
      // distance: ridedata?.distance,
      // type: data?.CabType?.name,
      // time: ridedata?.time,
    };

    for (let key in body) {
      //  return console.log('from for lopp ====================== >>> >>> >> > > > >')
      if (body[key] === '') {
        Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      }
      formData.append(key, body[key]);
    }
    formData.append('image', image);
    const url = 'auth/delivery-request';
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
      setDelivery_Id(response?.data?.data?.ride_info?.delivery_id);
      setRideStatus(response?.data?.data?.ride_info?.status);
      // setDestinationAppartment();
      // setDestinationDoorPhone();
      // setDestinationEntrance();
      // setDestinationFloor();
      // setreciverDetails();
      // setReciverContact();
      // setPickupAppartment();
      // setPickupDetails();
      // setPickupEnternce();
      // setPickupFloor();
      // setImage({});
      // setPickupDoorPhone();
      // setPaymentMethod();
      navigationService.navigate('MapScreen', {
        fromDelivery: true,
        delivery_Id: response?.data?.data?.ride_info?.delivery_id,
      });
      // Alert.alert('Waiting', 'Please wait here for rider to find your Request');
    }
  };

  // useEffect(() => {
  //   const reference = database().ref(`/requests/${delivery_Id}`);
  //   const listener = reference.on('value', snapshot => {
  //     if (snapshot.exists()) {
  //       const data = snapshot.val();
  //       if (data?.ride_info?.status && data?.ride_info?.status !== 'pending') {
  //         console.log('requesttttttttttttttttt accpet ho gyiiiiiiiiiiiiiiii hai ')
  //         Alert.alert('here i mmmmmmmmmmmmmmmmmmmmmm');
  //         // setRideuptedData(data);
  //         // setModalVisible(true);
  //         // setStatus(data.status);
  //       }
  //     }
  //   });
  //   return () => reference.off('value', listener);
  // }, [item?.delivery_id]);

  return (
    <RBSheet
      closeOnDragDown={true}
      ref={rbRef}
      height={450}
      dragFromTopOnly={true}
      openDuration={250}
      // closeOnPressMask={true}
      customStyles={{
        container: {
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          height: windowHeight * 0.78,
        },
      }}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: Color.white,
        }}>
        <CustomText style={styles.Text}>sender and recipient </CustomText>

        <View style={styles.bg}>
          <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
            }}>
            pickup location
          </CustomText>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TextInputWithTitle
              leftIcon={true}
              iconName={'call'}
              iconType={Ionicons}
              titleText={'contact'}
              placeholder={'contact'}
              setText={setSenderContact}
              value={senderContact}
              viewHeight={0.05}
              viewWidth={0.65}
              inputWidth={0.9}
              borderBottomWidth={1}
              fontSize={moderateScale(10, 0.6)}
              backgroundColor={'transparent'}
              borderColor={Color.mediumGray}
              marginTop={moderateScale(28, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
              keyboardType={'numeric'}
            />
            <TouchableOpacity style={styles.image_con}>
              {image != null ? (
                <CustomImage
                  style={{height: '100%', width: '100%'}}
                  source={{uri: image?.uri}}
                />
              ) : (
                <View style={{}}>
                  <CustomText style={styles.image}>add item image</CustomText>
                  <Icon
                    onPress={() => {
                      setIsModalVisible(true);
                    }}
                    style={styles.icon1}
                    as={EvilIcons}
                    name="camera"
                    size={moderateScale(35, 0.6)}
                    color={Color.black}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '90%',
            }}>
            <View
              style={{
                borderColor: Color.lightGrey,
                width: '60%',
                borderBottomWidth: 1,
                flexDirection: 'row',
                marginHorizontal: moderateScale(5, 0.3),
                alignItems: 'center',
              }}>
              <Icon
                as={FontAwesome6}
                size={moderateScale(12, 0.6)}
                color={Color.blue}
                name="circle-dot"
              />
              <CustomText
                numberOfLines={1}
                style={{marginHorizontal: moderateScale(5, 0.6)}}>
                {item?.pickupLocation?.name}
              </CustomText>
            </View>
            <TextInputWithTitle
              titleText={'Entrance'}
              placeholder={'Entrance'}
              setText={setPickupEnternce}
              value={pickupEntrance}
              viewHeight={0.05}
              viewWidth={0.35}
              inputWidth={0.32}
              borderBottomWidth={1}
              fontSize={moderateScale(10, 0.6)}
              backgroundColor={'transparent'}
              borderColor={Color.mediumGray}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '95%',
            }}>
            <TextInputWithTitle
              titleText={'appartment'}
              placeholder={'Appartment'}
              setText={setPickupAppartment}
              value={pickupAppartment}
              viewHeight={0.05}
              viewWidth={0.32}
              inputWidth={0.3}
              borderBottomWidth={1}
              fontSize={moderateScale(10, 0.6)}
              backgroundColor={'transparent'}
              borderColor={Color.mediumGray}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
            />
            <TextInputWithTitle
              titleText={'Floor'}
              placeholder={'Floor'}
              setText={setPickupFloor}
              value={pickupFloor}
              viewHeight={0.05}
              viewWidth={0.32}
              inputWidth={0.3}
              borderBottomWidth={1}
              fontSize={moderateScale(10, 0.6)}
              backgroundColor={'transparent'}
              borderColor={Color.mediumGray}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
            />
            <TextInputWithTitle
              titleText={'door phone'}
              placeholder={'Door Phone'}
              setText={setPickupDoorPhone}
              value={pickupDoorPhone}
              viewHeight={0.05}
              viewWidth={0.32}
              inputWidth={0.3}
              borderBottomWidth={1}
              fontSize={moderateScale(10, 0.6)}
              backgroundColor={'transparent'}
              borderColor={Color.mediumGray}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
            />
          </View>
          <TextInputWithTitle
            titleText={'Details'}
            placeholder={'Details to the address'}
            setText={setPickupDetails}
            value={pickupDetails}
            viewHeight={0.05}
            viewWidth={0.95}
            inputWidth={0.9}
            borderBottomWidth={1}
            fontSize={moderateScale(10, 0.6)}
            backgroundColor={'transparent'}
            borderColor={Color.mediumGray}
            marginTop={moderateScale(10, 0.3)}
            placeholderColor={Color.mediumGray}
            titleStlye={{right: 10}}
          />
        </View>
        <View style={styles.bg}>
          <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
            }}>
            destination location
          </CustomText>
        </View>
        <View>
          <TextInputWithTitle
            leftIcon={true}
            iconName={'call'}
            iconType={Ionicons}
            titleText={'contact'}
            placeholder={'contact'}
            setText={setReciverContact}
            value={reciverContact}
            viewHeight={0.05}
            viewWidth={0.95}
            inputWidth={0.9}
            borderBottomWidth={1}
            fontSize={moderateScale(10, 0.6)}
            backgroundColor={'transparent'}
            borderColor={Color.red}
            marginTop={moderateScale(10, 0.3)}
            placeholderColor={Color.mediumGray}
            titleStlye={{right: 10}}
            keyboardType={'numeric'}
          />

          <View
            style={{
              flexDirection: 'row',
              width: '90%',
            }}>
            <View style={styles.text_con}>
              <Icon
                as={FontAwesome6}
                size={moderateScale(12, 0.6)}
                color={Color.blue}
                name="circle-dot"
              />
              <CustomText
                numberOfLines={1}
                style={{marginHorizontal: moderateScale(5, 0.6)}}>
                {item?.dropLocation?.name}
              </CustomText>
            </View>
            <TextInputWithTitle
              titleText={'Entrance'}
              placeholder={'Entrance'}
              setText={setDestinationEntrance}
              value={destinationEntrance}
              viewHeight={0.05}
              viewWidth={0.35}
              inputWidth={0.32}
              borderBottomWidth={1}
              fontSize={moderateScale(10, 0.6)}
              backgroundColor={'transparent'}
              borderColor={Color.red}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
            />
          </View>
          <View style={styles.input_con}>
            <TextInputWithTitle
              titleText={'appartment'}
              placeholder={'Appartment'}
              setText={setDestinationAppartment}
              value={destinationAppartment}
              viewHeight={0.05}
              viewWidth={0.32}
              inputWidth={0.3}
              borderBottomWidth={1}
              fontSize={moderateScale(10, 0.6)}
              backgroundColor={'transparent'}
              borderColor={Color.red}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
            />
            <TextInputWithTitle
              titleText={'Floor'}
              placeholder={'Floor'}
              setText={setDestinationFloor}
              value={destinationFloor}
              viewHeight={0.05}
              viewWidth={0.32}
              inputWidth={0.3}
              borderBottomWidth={1}
              fontSize={moderateScale(10, 0.6)}
              backgroundColor={'transparent'}
              borderColor={Color.red}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
            />
            <TextInputWithTitle
              titleText={'door phone'}
              placeholder={'Door Phone'}
              setText={setDestinationDoorPhone}
              value={destinationDoorPhone}
              viewHeight={0.05}
              viewWidth={0.32}
              inputWidth={0.3}
              borderBottomWidth={1}
              fontSize={moderateScale(10, 0.6)}
              backgroundColor={'transparent'}
              borderColor={Color.red}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
            />
          </View>
          <TextInputWithTitle
            titleText={'Details'}
            placeholder={'Details  to the address'}
            setText={setreciverDetails}
            value={reciverDetails}
            viewHeight={0.05}
            viewWidth={0.95}
            inputWidth={0.9}
            borderBottomWidth={1}
            fontSize={moderateScale(10, 0.6)}
            backgroundColor={'transparent'}
            borderColor={Color.red}
            marginTop={moderateScale(10, 0.3)}
            placeholderColor={Color.mediumGray}
            titleStlye={{right: 10}}
          />
        </View>
        <View style={styles.main_con}>
          <CustomText style={styles.text}>payment method :</CustomText>
          <TouchableOpacity
            onPress={() => {
              setPaymentMethod('card');
            }}
            style={styles.payment_con}>
            <View style={styles.icon_con}>
              {paymentMethod == 'card' && (
                <Icon
                  size={moderateScale(15, 0.6)}
                  as={AntDesign}
                  color={Color.black}
                  name="check"
                />
              )}
            </View>
            <CustomText>card</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPaymentMethod('pay pall');
            }}
            style={styles.payment_con}>
            <View style={styles.icon_con}>
              {paymentMethod == 'pay pall' && (
                <Icon
                  size={moderateScale(15, 0.6)}
                  as={AntDesign}
                  color={Color.black}
                  name="check"
                />
              )}
            </View>
            <CustomText>pay pall</CustomText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            deliveryRequest();
          }}
          style={styles.btn_con}>
          {isLoading ? (
            <ActivityIndicator color={'white'} size={'small'} />
          ) : (
            <>
              <CustomText style={styles.btn_t}>Request</CustomText>
              <CustomText style={styles.btn_f}>{item?.fare + '$'}</CustomText>
            </>
          )}
        </TouchableOpacity>
      </View>
      <ImagePickerModal
        setShow={setIsModalVisible}
        show={isModalVisible}
        setFileObject={setImage}
      />
    </RBSheet>
  );
};

export default RequestForDelivery;

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: moderateScale(10, 0.3),
  },
  Text: {
    fontSize: moderateScale(18, 0.6),
    textAlign: 'center',
    paddingVertical: moderateScale(10, 0.3),
  },
  input: {
    backgroundColor: Color.lightGrey,
    width: windowWidth * 0.9,
    height: windowHeight * 0.16,
    marginVertical: moderateScale(20, 0.3),
    borderRadius: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(20, 0.3),
  },
  btnText: {
    color: Color.white,
    fontSize: moderateScale(17, 0.3),
  },
  bg: {
    width: '95%',
    height: windowHeight * 0.024,
    borderRadius: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    backgroundColor: Color.lightGrey,
  },
  btn: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    borderBottomWidth: 0.6,
    borderColor: Color.lightGrey,
    marginVertical: moderateScale(9, 0.3),
  },
  icon_con: {
    borderWidth: 0.6,
    borderRadius: 5,
    borderColor: Color.mediumGray,
    marginHorizontal: moderateScale(10, 0.6),
    height: windowHeight * 0.016,
    marginTop: moderateScale(5, 0.6),
    width: windowWidth * 0.05,
  },
  payment_con: {
    flexDirection: 'row',
    marginRight: moderateScale(10, 0.6),
  },
  main_con: {
    // backgroundColor :'red' ,
    flexDirection: 'row',
    width: '90%',
    paddingVertical: moderateScale(10, 0.6),
  },
  text: {
    textAlign: 'left',
    paddingTop: moderateScale(5, 0.6),
    width: '40%',
  },
  input_con: {
    flexDirection: 'row',
    width: '95%',
  },
  text_con: {
    borderColor: Color.lightGrey,
    width: '60%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginHorizontal: moderateScale(5, 0.3),
    alignItems: 'center',
  },
  image_con: {
    height: windowHeight * 0.07,
    width: '30%',
    marginTop: moderateScale(10, 0.6),
    borderWidth: 0.5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    fontSize: moderateScale(10, 0.6),
    textAlign: 'center',
    paddingTop: moderateScale(6, 0.6),
  },
  icon1: {
    alignSelf: 'center',
    height: '100%',
  },
  btn_con: {
    backgroundColor: Color.btn_Color,
    width: windowWidth * 0.8,
    height: windowHeight * 0.075,
    borderRadius: moderateScale(30, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(5, 0.6),
  },
  btn_t: {
    color: Color.white,
    fontSize: moderateScale(14, 0.6),
    letterSpacing: 0.9,
  },
  btn_f: {
    color: Color.white,
    fontSize: moderateScale(12, 0.6),
    letterSpacing: 0.9,
  },
});
