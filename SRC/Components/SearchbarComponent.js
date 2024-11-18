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
      
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={[
         { width: windowWidth * 0.9,
          height: windowHeight * 0.06,
          borderWidth: 1,
          borderColor: Color.veryLightGray,
          borderRadius: moderateScale(20, 0.3),
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: moderateScale(10, 0.6)},
          SearchStyle
        ]}>
        <Feather name="search" size={25} color={Color.Grey} />
        <TextInput
          style={{color:'black'}}          
          placeholder={placeholderName ? placeholderName : 'Search item here'}
          placeholderTextColor={placeHolderColor ? placeHolderColor : '#000'}
          fontSize={fontSize ? fontSize : 14}
          numberOfLines={1}
          value={search}
          onChangeText={text => {
            setSearch(text);
            OnSearch(text);
          }}
          editable={disable}
        />
      </View>

    </View>

  );
};

export default SearchbarComponent;
