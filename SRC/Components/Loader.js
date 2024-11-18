import React from 'react';
import { SIZES } from '../../constants';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const Loader = ({ style, color, size }) => {
    return (
        <View
            style={{
                marginTop: moderateScale(20, 0.6),
                alignItems: 'center',
            }}>
            <LottieView
                autoPlay
                loop
                style={[
                    {
                        height: '40%',
                        width: 120,
                        alignItems: 'center',
                        alignSelf: 'center',
                    },
                    style,
                ]}
                source={require('../Assets/animations/loader.json')}
            />
        </View>
    );
};

export default Loader;
