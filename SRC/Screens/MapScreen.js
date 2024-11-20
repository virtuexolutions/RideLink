import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Pulse from 'react-native-pulse';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AskLocation from '../Components/AskLocation';
import CustomText from '../Components/CustomText';
import {mode} from 'native-base/lib/typescript/theme/tools';
import CustomButton from '../Components/CustomButton';
import RequestModal from '../Components/RequestModal';
import Header from '../Components/Header';
import DeclineModal from '../Components/DeclineModal';

const MapScreen = () => {
  const [price, setPrice] = useState(50);
  const [modalVisible, setModalVisible] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  return (
    <SafeAreaView style={styles.safe_are}>
      <ImageBackground
        style={styles.background_view}
        source={require('../Assets/Images/map2.png')}>
        <Pulse
          color={Color.black}
          numPulses={3}
          diameter={400}
          speed={20}
          duration={2000}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <View style={styles.circle}>
          <Icon
            name="map-marker-alt"
            as={FontAwesome5}
            size={moderateScale(30, 0.6)}
            color={Color.white}
            style={{left: 5}}
          />
        </View>
        <View style={{position: 'absolute', bottom: 20}}>
          <AskLocation
            main_view_style={{height: windowHeight * 0.17}}
            heading={'Waiting For Replies'}
            renderView={
              <View style={styles.offer_view}>
                <CustomText style={styles.text}>Your Offer</CustomText>
                <View style={styles.payment_view}>
                  <TouchableOpacity
                    onPress={() => setPrice(price - 5)}
                    style={styles.icon_view}>
                    <Icon
                      name="minus"
                      as={FontAwesome5}
                      color={Color.white}
                      size={moderateScale(10, 0.6)}
                    />
                  </TouchableOpacity>
                  <CustomText isBold style={styles.price}>
                    {'$'} {price}
                  </CustomText>
                  <TouchableOpacity
                    onPress={() => setPrice(price + 5)}
                    style={styles.icon_view}>
                    <Icon
                      name="plus"
                      as={FontAwesome5}
                      color={Color.white}
                      size={moderateScale(10, 0.6)}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            }
          />
          <CustomButton
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            bgColor={Color.themeBlack}
            borderRadius={moderateScale(30, 0.3)}
            textColor={Color.white}
            textTransform={'none'}
            text={'RAISE FARE'}
            isBold
            onPress={() => setModalVisible(true)}
          />
        </View>
        <RequestModal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onPressDecline={() => {
            setModalVisible(false);
            setDeclineModal(true);
          }}
        />
        <DeclineModal
          isVisible={declineModal}
          onBackdropPress={() => setDeclineModal(false)}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  safe_are: {
    width: windowWidth,
    height: windowHeight,
  },
  background_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
    paddingVertical: moderateScale(20, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    backgroundColor: Color.black,
    borderRadius: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Color.white,
  },
  offer_view: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
    color: Color.black,
    paddingVertical: moderateScale(6, 0.6),
    width: '80%',
    borderBottomWidth: 0.8,
    borderBottomColor: '#D8D8D8',
  },
  payment_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12, 0.6),
    marginTop: moderateScale(10, 0.6),
  },
  icon_view: {
    width: moderateScale(25, 0.6),
    height: moderateScale(25, 0.6),
    backgroundColor: Color.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: windowWidth,
  },
  price: {
    width: '70%',
    fontSize: moderateScale(20, 0.6),
    textAlign: 'center',
  },
});
