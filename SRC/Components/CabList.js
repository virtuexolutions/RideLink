import React, {useState} from 'react';
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

const CabList = ({data, setRef, rbRef, setClientReview}) => {
  const token = useSelector(state => state.authReducer.token);
  const [selectedCab, setSelectedCab] = useState(null);
  const standardCabs = [
    {
      id: 1,
      cabName: 'Lynk X',
      feature: 'Budget-friendly everyday rides.',
      price: 'varies',
      capacity: 4,
      time: 'Real time in Minutes, wait time',
    },
    {
      id: 2,
      cabName: 'Lynk Plus',
      feature: 'Spacious, newer vehicles with extra comfort.',
      price: 'varies',
      capacity: 4,
      time: 'Real time in Minutes, wait time',
    },
    {
      id: 3,
      cabName: 'Lynk XL',
      feature: 'Budget-friendly larger vehicles for up to 6 passengers.',
      price: 'varies',
      capacity: 6,
      time: 'Real time in Minutes, wait time',
    },
  ];

  const economyCabs = [
    {
      id: 1,
      cabName: 'LynkEase',
      feature: 'Smooth, quiet rides with additional comfort.',
      price: 'varies',
      capacity: 4,
      time: 'Real time in Minutes, wait time',
    },
    {
      id: 2,
      cabName: 'Lynk Eco',
      feature: 'Eco-friendly rides in hybrid or electric vehicles',
      price: 'varies',
      capacity: 4,
      time: 'Real time in Minutes, wait time',
    },
    {
      id: 3,
      cabName: 'Lynk Pet',
      feature: 'Pet-friendly rides for passengers traveling with pets.',
      price: 'varies',
      capacity: 4,
      time: 'Real time in Minutes, wait time',
    },
  ];

  const premiumCabs = [
    {
      id: 1,
      cabName: 'Lynk SUV',
      feature: 'High-end luxury rides with professional drivers.',
      price: 'varies',
      capacity: 6,
      time: 'Real time in Minutes, wait time',
    },
    {
      id: 2,
      cabName: 'Lynk Max',
      feature: 'Vans or large vehicles for events and group travel.',
      price: 'varies',
      capacity: 6,
      time: 'Real time in Minutes, wait time',
    },
    {
      id: 3,
      cabName: 'Taxi',
      feature: 'Traditional friendly Local Taxi.',
      price: 'varies',
      capacity: 4,
      time: 'Real time in Minutes, wait time',
    },
    {
      id: 4,
      cabName: 'LynkAccess',
      feature:
        'Wheelchair-accessible vehicles for passengers with disabilities.',
      price: 'varies',
      capacity: 4,
      time: 'Real time in Minutes, wait time',
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
        style={
          {
            // height: '100%',
          }
        }
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
              selectedCab != null &&
                navigationService.navigate('FareScreen', {
                  rideData: {...data, cabtype: selectedCab},
                });
            }}
          />
        </View>
      </ScrollView>
    </RBSheet>
  );
};

export default CabList;

const styles = StyleSheet.create({
  main_con: {
    // alignItems: 'center',
    //  height: windowHeight * 0.9
  },
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
        flexDirection: 'row',
        borderWidth: item?.cabName == selectedCab?.cabName ? 0.7 : 0.3,
        borderColor:
          item?.cabName == selectedCab?.cabName ? Color.black : 'transparent',
        justifyContent: 'space-between',
        paddingVertical: moderateScale(10, 0.6),
      }}>
      <View
        style={{
          flexDirection: 'row',
          // alignItems :'center',
        }}>
        <View
          style={{
            height: windowHeight * 0.1,
            width: windowWidth * 0.2,
          }}>
          <CustomImage
            style={{
              height: '100%',
              width: '100%',
            }}
            source={require('../Assets/Images/parcelimage.png')}
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
              // paddingHorizontal: moderateScale(10, 0.6),

              // width: windowWidth * 0.5,
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
            {data?.time }
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
        <CustomText>&73.99 </CustomText>
      </View>
    </TouchableOpacity>
  );
};
