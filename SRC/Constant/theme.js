import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius_sm: 4,
    radius: 30,
    padding: 20,
    padding2: 12,

    // font sizes
    h8: 8,
    h9: 9,
    h10: 10,
    h11: 11,
    h12: 12,
    h13: 13,
    h14: 14,
    h16: 16,
    h18: 18,
    h20: 20,
    h24: 24,
    h22: 22,
    h23: 23,
    h24: 24,
    h26: 26,
    // screen width Height

    screenWidth: Dimensions.get('screen').width,
    screenHeight: Dimensions.get('screen').height,
};



export const FONTS = {

    // poppins
    PoppinsBold8: {
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(SIZES.h8),
    },
    PoppinsBold11: {
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(SIZES.h11),
    },
    PoppinsBold12: {
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(SIZES.h12),
    },
    PoppinsBold13: {
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(SIZES.h13),
    },
    PoppinsBold14: {
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(SIZES.h14),
    },
    PoppinsBold16: {
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(SIZES.h16),
    },
    PoppinsBold18: {
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(SIZES.h18),
    },
    PoppinsBold20: {
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(SIZES.h20),
    },

    PoppinsBold22: {
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(SIZES.h22),
    },
    PoppinsBold24: {
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(SIZES.h24),
    },
    PoppinsBold26: {
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(SIZES.h26),
    },

    // Medium Fonts
    PoppinsMedium8: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(SIZES.h8),
    },
    PoppinsMedium11: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(SIZES.h11),
    },
    PoppinsMedium12: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(SIZES.h12),
    },
    PoppinsMedium13: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(SIZES.h13),
    },
    PoppinsMedium14: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(SIZES.h14),
    },
    PoppinsMedium16: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(SIZES.h16),
    },
    PoppinsMedium18: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(SIZES.h18),
    },
    PoppinsMedium20: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(SIZES.h20),
    },
    PoppinsMedium24: {
        fontFamily: 'Poppins-Medium',
        fontSize: RFValue(SIZES.h24),
    },
    // Regular Fonts
    poppinsRegular9: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(SIZES.h9),
    },
    poppinsRegular10: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(SIZES.h10),
    },
    poppinsRegular11: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(SIZES.h11),
    },
    poppinsRegular12: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(SIZES.h12),
    },
    poppinsRegular13: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(SIZES.h13),
    },
    poppinsRegular14: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(SIZES.h14),
    },
    poppinsRegular16: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(SIZES.h16),
    },
    poppinsRegular18: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(SIZES.h18),
    },
    poppinsRegular20: {
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(SIZES.h20),
    },
    //PoppinsLight Fonts
    PoppinsLight10: {
        fontFamily: 'Poppins-Light',
        fontSize: RFValue(SIZES.h10),
    },
    PoppinsLight11: {
        fontFamily: 'Poppins-Light',
        fontSize: RFValue(SIZES.h11),
    },
    PoppinsLight13: {
        fontFamily: 'Poppins-Light',
        fontSize: RFValue(SIZES.h13),
    },
    PoppinsLight14: {
        fontFamily: 'Poppins-Light',
        fontSize: RFValue(SIZES.h14),
    },
    PoppinsSemiBold7: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(SIZES.h7)
    },
    PoppinsSemiBold8: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(SIZES.h8)
    },
    PoppinsSemiBold12: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(SIZES.h12)
    },

    PoppinsSemiBold13: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: RFValue(SIZES.h13)
    },
    //  Monstserrat
    // Bold Fonts
    Bold8: {
        fontFamily: 'Montserrat-Bold',
        fontSize: RFValue(SIZES.h8),
    },
    Bold11: {
        fontFamily: 'Montserrat-Bold',
        fontSize: RFValue(SIZES.h11),
    },
    Bold12: {
        fontFamily: 'Montserrat-Bold',
        fontSize: RFValue(SIZES.h12),
    },
    Bold13: {
        fontFamily: 'Montserrat-Bold',
        fontSize: RFValue(SIZES.h13),
    },
    Bold14: {
        fontFamily: 'Montserrat-Bold',
        fontSize: RFValue(SIZES.h14),
    },
    Bold16: {
        fontFamily: 'Montserrat-Bold',
        fontSize: RFValue(SIZES.h16),
    },
    Bold18: {
        fontFamily: 'Montserrat-Bold',
        fontSize: RFValue(SIZES.h18),
    },
    Bold20: {
        fontFamily: 'Montserrat-Bold',
        fontSize: RFValue(SIZES.h20),
    },

    Bold22: {
        fontFamily: 'Montserrat-Bold',
        fontSize: RFValue(SIZES.h22),
    },
    Bold24: {
        fontFamily: 'Montserrat-Bold',
        fontSize: RFValue(SIZES.h24),
    },
    Bold26: {
        fontFamily: 'Montserrat-Bold',
        fontSize: RFValue(SIZES.h26),
    },

    // Medium Fonts
    Medium11: {
        fontFamily: 'Montserrat-Medium',
        fontSize: RFValue(SIZES.h11),
    },
    Medium12: {
        fontFamily: 'Montserrat-Medium',
        fontSize: RFValue(SIZES.h12),
    },
    Medium13: {
        fontFamily: 'Montserrat-Medium',
        fontSize: RFValue(SIZES.h13),
    },
    Medium14: {
        fontFamily: 'Montserrat-Medium',
        fontSize: RFValue(SIZES.h14),
    },
    Medium16: {
        fontFamily: 'Montserrat-Medium',
        fontSize: RFValue(SIZES.h16),
    },
    Medium18: {
        fontFamily: 'Montserrat-Medium',
        fontSize: RFValue(SIZES.h18),
    },
    Medium20: {
        fontFamily: 'Montserrat-Medium',
        fontSize: RFValue(SIZES.h20),
    },
    Medium24: {
        fontFamily: 'Montserrat-Medium',
        fontSize: RFValue(SIZES.h24),
    },
    // Regular Fonts
    Regular9: {
        fontFamily: 'Montserrat-Regular',
        fontSize: RFValue(SIZES.h9),
    },
    Regular10: {
        fontFamily: 'Montserrat-Regular',
        fontSize: RFValue(SIZES.h10),
    },
    Regular11: {
        fontFamily: 'Montserrat-Regular',
        fontSize: RFValue(SIZES.h11),
    },
    Regular12: {
        fontFamily: 'Montserrat-Regular',
        fontSize: RFValue(SIZES.h12),
    },
    Regular13: {
        fontFamily: 'Montserrat-Regular',
        fontSize: RFValue(SIZES.h13),
    },
    Regular14: {
        fontFamily: 'Montserrat-Regular',
        fontSize: RFValue(SIZES.h14),
    },
    Regular16: {
        fontFamily: 'Montserrat-Regular',
        fontSize: RFValue(SIZES.h16),
    },
    Regular18: {
        fontFamily: 'Montserrat-Regular',
        fontSize: RFValue(SIZES.h18),
    },
    Regular20: {
        fontFamily: 'Montserrat-Regular',
        fontSize: RFValue(SIZES.h20),
    },
    //PoppinsLight Fonts
    PoppinsLight10: {
        fontFamily: 'Montserrat-Light',
        fontSize: RFValue(SIZES.h10),
    },
    PoppinsLight11: {
        fontFamily: 'Montserrat-Light',
        fontSize: RFValue(SIZES.h11),
    },
    PoppinsLight13: {
        fontFamily: 'Montserrat-Light',
        fontSize: RFValue(SIZES.h13),
    },
    PoppinsLight14: {
        fontFamily: 'Montserrat-Light',
        fontSize: RFValue(SIZES.h14),
    },
    black13: {
        fontFamily: 'Montserrat-Black',
        fontSize: RFValue(SIZES.h13),
    },
    black14: {
        fontFamily: 'Montserrat-Black',
        fontSize: RFValue(SIZES.h14),
    },
    black18: {
        fontFamily: 'Montserrat-Black',
        fontSize: RFValue(SIZES.h18),
    },
    black24: {
        fontFamily: 'Montserrat-Black',
        fontSize: RFValue(SIZES.h24),
    },
    heavy12: {
        fontFamily: 'Montserrat-Heavy',
        fontSize: RFValue(SIZES.h12),
    },
    heavy14: {
        fontFamily: 'Montserrat-Heavy',
        fontSize: RFValue(SIZES.h14),
    },
    heavy16: {
        fontFamily: 'Montserrat-Heavy',
        fontSize: RFValue(SIZES.h16),
    },
    heavy20: {
        fontFamily: 'Montserrat-Heavy',
        fontSize: RFValue(SIZES.h20),
    },
};

const appTheme = { SIZES, FONTS };

export default appTheme;
