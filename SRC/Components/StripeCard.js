import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from './CustomButton';
import Color from '../Assets/Utilities/Color';
import {CardField} from '@stripe/stripe-react-native';

const StripeCard = ({rbRef, setCardDetails, loading ,onPressHandle ,text}) => {
  console.log("🚀 ~ StripeCard ~ loading:", loading)
  return (
    <RBSheet
      closeOnDragDown={true}
      ref={rbRef}
      height={250}
      dragFromTopOnly={true}
      openDuration={250}
      // closeOnPressMask={true}
      customStyles={{
        container: {
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          height: windowHeight * 0.35,
        },
      }}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: Color.white,
          paddingVertical: moderateScale(10, 0.6),
        }}>
        <CustomText
          style={{
            fontSize: moderateScale(20, 0.6),
            marginBottom: moderateScale(30, 0.6),
            color: Color.black,
          }}>
          add card
        </CustomText>
        <View
          style={{
            height: windowHeight * 0.2,
            width: windowWidth * 0.9,
            alignItems :'center',
            borderWidth : 1,
            borderColor : Color.black,
            borderRadius : 20,
            paddingTop : moderateScale(10,.6)
          }}>
          <CardField
            postalCodeEnabled={false}
            placeholderColor={Color.darkGray}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: Color.lightGrey,
              borderRadius: moderateScale(10, 0.6),
              width: windowWidth * 0.5,
              borderRadius: moderateScale(35, 0.6),
              textColor: 'black',
              placeholderColor: Color.darkGray,
              
            }}
            style={{
              width: '95%',
              height: windowHeight * 0.06,
              marginVertical: moderateScale(10, 0.3),
            }}
            onCardChange={cardDetails => {
              setCardDetails(cardDetails);
            }}
            onFocus={focusedField => {}}
          />
          <CustomButton
            style={
              {
                // position : 'absolute' ,
                // bottom : 10,
              }
            }
            // disabled={stripeToken}
            textColor={Color.white}
            text={
            text
            }
            onPress={() => {
                onPressHandle()
              //   strpieToken();
            }}
            //   backgroundColor={Color.red}
            width={windowWidth * 0.8}
            height={windowHeight * 0.07}
            borderRadius={moderateScale(25, 0.6)}
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            marginTop={moderateScale(10, 0.6)}
            bgColor={'black'}
            isBold
            // disabled={isStripe}
          />
        </View>
      </View>
    </RBSheet>
  );
};

export default StripeCard;

const styles = StyleSheet.create({});
