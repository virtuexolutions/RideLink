import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import CustomImage from './CustomImage';
import {
  height,
  resizeMode,
} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {position} from 'native-base/lib/typescript/theme/styled-system';
import CustomText from './CustomText';

const DeliveryBox = ({data}) => {
   const [focused,setFocused] = useState('')
 
  return (
    <TouchableOpacity 
        style={styles.box}>
      <View style={styles.image_Style}>
        <CustomImage
          style={{height: '100%', width: '100%', resizeMode: 'contain',
           
          }}
          source={data.image}
        />
      </View>
      <CustomText
        style={{
          fontSize: moderateScale(10, 0.6),
          color: Color.themeBlack,
          fontWeight: 'bold',position:'absolute', marginTop:moderateScale(17,0.6)
        }}>
        {data.title}
      </CustomText>
    </TouchableOpacity>
  );
};

export default DeliveryBox;

const styles = StyleSheet.create({
  image_Style: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.23,
    position:'absolute',
    
    bottom:moderateScale(10,0.6),
    // backgroundColor: 'red',
  },
  imageFocused:{
    height: windowHeight * 0.08,
    width: windowWidth * 0.23,
    position:'absolute',
    
    // bottom:moderateScale(3,0.6),
    // backgroundColor: 'red',
  },
  box: {
    width: windowWidth * 0.33,
    height: windowHeight * 0.05,
    marginRight:moderateScale(5,0.6),
    borderRadius: moderateScale(15, 0.6),
    borderWidth: 1,
    alignItems: 'center',
   backgroundColor:Color.white,
    borderColor:Color.boxgrey,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4,
  },
  focusedBox:{
    width: windowWidth * 0.33,
    height: windowHeight * 0.4,
    marginRight:moderateScale(5,0.6),
    borderRadius: moderateScale(15, 0.6),
    borderWidth: 1,
    alignItems: 'center',
   backgroundColor:Color.white,
    borderColor:Color.boxgrey,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4,
  }
});
