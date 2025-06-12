import React, {useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RequestForDelivery from './RequestForDelivery';

const CabList = ({data, setRef, rbRef, setClientReview}) => {
  console.log("🚀 ~ CabList ~ data:", data)
  const token = useSelector(state => state.authReducer.token);

  const deliveryRef = useRef(null);
  const [selectedCab, setSelectedCab] = useState(null);
  const standardCabs = [
    {
      id: 1,
      cabName: 'Lynk X',
      feature: 'Budget-friendly everyday rides.',
      capacity: 4,
    },
    {
      id: 2,
      cabName: 'Lynk Plus',
      feature: 'Spacious, newer vehicles with extra comfort.',
      capacity: 4,
    },
    {
      id: 3,
      cabName: 'Lynk XL',
      feature: 'Budget-friendly larger vehicles for up to 6 passengers.',
      capacity: 6,
    },
  ];

  const economyCabs = [
    {
      id: 1,
      cabName: 'LynkEase',
      feature: 'Smooth, quiet rides with additional comfort.',
      capacity: 4,
    },
    {
      id: 2,
      cabName: 'Lynk Eco',
      feature: 'Eco-friendly rides in hybrid or electric vehicles',
      capacity: 4,
    },
    {
      id: 3,
      cabName: 'Lynk Pet',
      feature: 'Pet-friendly rides for passengers traveling with pets.',
      capacity: 4,
    },
  ];

  const premiumCabs = [
    {
      id: 1,
      cabName: 'Lynk SUV',
      feature: 'High-end luxury rides with professional drivers.',
      capacity: 6,
    },
    {
      id: 2,
      cabName: 'Lynk Max',
      feature: 'Vans or large vehicles for events and group travel.',
      capacity: 6,
    },
    {
      id: 3,
      cabName: 'Taxi',
      feature: 'Traditional friendly Local Taxi.',
      capacity: 4,
    },
    {
      id: 4,
      cabName: 'LynkAccess',
      feature:
        'Wheelchair-accessible vehicles for passengers with disabilities.',
      capacity: 4,
    },
  ];

  return (
    <RBSheet
      ref={rbRef}
      closeOnDragDown={true}
      height={450}
      dragFromTopOnly={true}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}>
      <CustomText style={styles.main_heading}>choose a ride</CustomText>
      <ScrollView
     
        showsVerticalScrollIndicator={false}>
        <View style={styles.main_con}>
          <CustomText style={styles.h1}>Standered</CustomText>
          <View>
            <FlatList
              contentContainerStyle={{
                marginBottom: moderateScale(10, 0.6),
                alignItems: 'center',
              }}
              keyExtractor={item => {
                item?.id;
              }}
              scrollEnabled={false}
              data={standardCabs}
              renderItem={({item}) => {
                return (
                  <Card
                    setSelectedCab={setSelectedCab}
                    selectedCab={selectedCab}
                    item={item}
                    data={data}
                  />
                );
              }}
            />
          </View>
          <CustomText style={styles.h1}>Economy</CustomText>
          <View>
            <FlatList
              contentContainerStyle={{
                marginBottom: moderateScale(20, 0.6),
                alignItems: 'center',
              }}
              keyExtractor={item => {
                item?.id;
              }}
              scrollEnabled={false}
              data={economyCabs}
              renderItem={({item}) => {
                return (
                  <Card
                    setSelectedCab={setSelectedCab}
                    selectedCab={selectedCab}
                    item={item}
                    data={data}
                  />
                );
              }}
            />
          </View>
          <CustomText style={styles.h1}>Premium</CustomText>
          <View>
            <FlatList
              contentContainerStyle={{
                marginBottom: moderateScale(20, 0.6),
                alignItems: 'center',
              }}
              keyExtractor={item => {
                item?.id;
              }}
              scrollEnabled={false}
              data={premiumCabs}
              renderItem={({item}) => {
                return (
                  <Card
                    data={data}
                    setSelectedCab={setSelectedCab}
                    selectedCab={selectedCab}
                    item={item}
                  />
                );
              }}
            />
          </View>
          <CustomButton
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            bgColor={Color.themeBlack}
            borderRadius={moderateScale(30, 0.3)}
            textColor={Color.white}
            marginBottom={moderateScale(10, 0.6)}
            textTransform={'none'}
            text={'Choose Lynk Cab'}
            isBold
            onPress={() => {
              selectedCab != null && data?.data?.title == 'ride'
                ? navigationService.navigate('FareScreen', {
                    rideData: {...data, cabtype: selectedCab},
                  })
                : deliveryRef.current.open();

              // rbRef.current.close()
            }}
          />
        </View>
        <RequestForDelivery
          rbRef={deliveryRef}
          item={{
            pickupLocation: data?.pickupLocation,
            dropLocation: data?.dropoffLocation,
            fare: data?.fare,
            data: data?.data,
          }}
        />
      </ScrollView>
    </RBSheet>
  );
};

export default CabList;

const styles = StyleSheet.create({
  h1: {
    fontSize: moderateScale(16, 0.6),
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: moderateScale(25, 0.6),
  },
  main_heading: {
    width: '100%',
    fontSize: moderateScale(18, 0.6),
    textAlign: 'center',
    color: Color.btn_Color,
    marginTop: moderateScale(10, 0.6),
  },
});

export const Card = ({setSelectedCab, selectedCab, item, data}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedCab(item);
      }}
      activeOpacity={0.4}
      style={{
        width: windowWidth * 0.9,
        height: windowHeight * 0.12,
        marginVertical: moderateScale(5.3),
        borderRadius: 10,
        backgroundColor: Color.white,
        flexDirection: 'row',
        borderWidth: item?.cabName == selectedCab?.cabName ? 0.7 : 0.3,
        borderColor:
          item?.cabName == selectedCab?.cabName ? Color.black : 'transparent',
        justifyContent: 'space-between',
        paddingVertical: moderateScale(10, 0.6),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            height: windowHeight * 0.07,
            width: windowWidth * 0.24,
            marginTop: moderateScale(14, 0.3),
          }}>
          <CustomImage
            onPress={() => {
              setSelectedCab(item);
            }}
            style={{
              height: '100%',
              width: '100%',
            }}
            source={require('../Assets/Images/cab_image.jpg')}
          />
        </View>
        <View
          style={{
            paddingHorizontal: moderateScale(10, 0.6),
            paddingTop: moderateScale(5, 0.6),
            width: windowWidth * 0.5,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <CustomText
              numberOfLines={1}
              style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.black,
              }}>
              {item?.cabName}
            </CustomText>
            <Icon
              style={{
                marginHorizontal: moderateScale(5, 0.6),
                marginTop: moderateScale(5, 0.6),
              }}
              name="user"
              as={FontAwesome}
              size={moderateScale(10, 0.6)}
              color={Color.black}
            />
            <CustomText
              numberOfLines={1}
              style={{
                fontSize: moderateScale(10, 0.6),
              }}>
              {item?.capacity}
            </CustomText>
          </View>
          <CustomText
            numberOfLines={1}
            style={{
              fontSize: moderateScale(10, 0.6),
            }}>
            {`${data?.time} min`}
          </CustomText>
          <CustomText
            numberOfLines={2}
            style={{
              fontSize: moderateScale(10, 0.6),
            }}>
            {item?.feature}
          </CustomText>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: moderateScale(10, 0.6),
          paddingTop: moderateScale(10, 0.6),
        }}>
        <CustomText>{`$${data?.fare}`} </CustomText>
      </View>
    </TouchableOpacity>
  );
};
