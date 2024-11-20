import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale} from 'react-native-size-matters';
import {windowWidth, windowHeight} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { Icon } from 'native-base';

const SearchbarComponent = ({
  setNewData,
  placeholderName,
  placeHolderColor,
  array,
  arrayItem,
  fontSize,
  alignSelf,
  SearchStyle,
  search,
  setSearch,
  disable
}) => {
  console.log("🚀 ~ file: SearchbarComponent.js:28 ~ arrayItem:", arrayItem)
  console.log("🚀 ~ file: SearchbarComponent.js:28 ~ array:", array)
  // const [search, setSearch] = useState('');
  const orderData = useSelector(state => state.commonReducer.order);

  const OnSearch = text => {
  //  return console.log("🚀 ~ OnSearch ~ text:", text)
    let tempdata = array.filter(item => {
      return (arrayItem == 'order'
        ? item?.orderId.toString().indexOf(text) > -1
        : arrayItem == 'Product' ? item?.title?.toLowerCase().indexOf(text?.toLowerCase()) > -1
        : item?.name?.toLowerCase().indexOf(text?.toLowerCase()) > -1)
    });
    console.log("🚀 ~ tempdata ~ tempdata:", tempdata)
    // console.log("🚀 ~ tempdata ~ tempdata:", tempdata)

    setNewData(tempdata);
  };

  return (
    
      <View
        style={[
         { width: windowWidth * 0.9,
          height: windowHeight * 0.06,
          borderWidth: 0.3,
          borderColor: Color.veryLightGray,
          marginTop:moderateScale(5,0.6),
          borderRadius: moderateScale(20, 0.3),
          paddingHorizontal:moderateScale(10,0.6),flexDirection:'row',
        justifyContent:'space-between',alignItems:'center',alignSelf:'center'},
          
          SearchStyle
        ]}>
        
        <TextInput
          style={{color:'black'}}          
          placeholder={placeholderName ? placeholderName : 'Search'}
          placeholderTextColor={placeHolderColor ? placeHolderColor : Color.veryLightGray}
          fontSize={fontSize ? fontSize : 14}
          numberOfLines={1}
          value={search}
          onChangeText={text => {
            setSearch(text);
            OnSearch(text);
          }}
          editable={disable}
        />
     <Icon as={Feather} name="search" size={moderateScale(17,0.6)} color={Color.grey} />
    
      </View>
      
  

  );
};

export default SearchbarComponent;
