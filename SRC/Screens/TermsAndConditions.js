import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'native-base';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {useNavigation} from '@react-navigation/native';
import TernsComponent from '../Components/TernsComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaView } from 'react-native-safe-area-context';

const TermsAndConditions = props => {
  const isSignup = props?.route?.params?.isSignup;
  console.log(isSignup, 'isSignup');
  // const navigation = useNavigation();
  const terms = [
    {
      id: 2,
      heading: 'Definitions',
      description: '',
      subterms: [
        `"Agreement" means these Terms of Service.`,
        `"Driver" means an individual who provides transportation services to Riders via the RideLynk Platform.`,
        `"Rider" means an individual who requests transportation services via the RideLynk Platform.`,
        `"Rideshare Services" means the transportation services provided by Drivers or via Autonomous Vehicles through the RideLynk Platform.`,
        `"Rideshare Provider" means a Driver or operator of an Autonomous Vehicle providing Rideshare Services.`,
        `"RideLynk Platform" means the technology, applications, and websites that connect Riders with Rideshare Providers and facilitate other services.`,
        `"RideLynk Services" means services provided directly by RideLynk via the Platform, excluding Rideshare Services and Third-Party Services.`,
        `"Third-Party Services" means services provided by entities other than RideLynk that are accessible through the RideLynk Platform.`,
        `"User" means any individual (Driver, Rider, or other user, excluding Excluded Individuals) who uses the RideLynk Platform.`,
        `"User Account" means the account created by a User to access the RideLynk Platform.`,
        `"Your Information" means any information you provide, publish, or post to or through the RideLynk Platform.`,
      ],
    },
    {
      id: 3,
      heading: 'The RideLynk Platform Description',
      description: `The RideLynk Platform is a technology-based marketplace that facilitates connections between Riders seeking transportation and Rideshare Providers. RideLynk is not a transportation carrier, common carrier, or employer of Drivers. The provision of Rideshare Services is solely between the Rider and the Rideshare Provider; RideLynk acts solely as an intermediary technology platform.`,
      subterms: [],
    },
    {
      id: 4,
      heading: 'Eligibility and User Accounts',
      description: '',
      subterms: [
        `4.1 Eligibility. To use the RideLynk Platform, you must be at least 18 years old and have the legal capacity to enter into a binding contract.`,
        `4.2 Minors. A parent or legal guardian may create an account for a 16 or 17-year-old minor, subject to specific restrictions, including that the minor may not request or accept Rideshare Services unless accompanied by the guardian. The guardian assumes all liability for the minor's use of the Platform.`,
        `4.3 Account Creation. You must create a User Account to access the Platform. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You may not assign or transfer your account to any other person.`,
        `4.4 Accuracy. You agree to provide and maintain accurate, current, and complete information in your User Account.`,
      ],
    },
    {
      id: 5,
      heading: 'License Grant',
      description: `Subject to your compliance with this Agreement, RideLynk grants you a limited, non-exclusive, non-sublicensable, revocable, non-transferable license to access and use the RideLynk Platform for your personal, non-commercial use.`,
      subterms: [],
    },
    {
      id: 6,
      heading: 'User Conduct and Restricted Activities',
      description: `You agree not to engage in the following prohibited activities:`,
      subterms: [
        `Violate any applicable law or regulation.`,
        `Harass, abuse, threaten, or harm other Users or third parties.`,
        `Use the Platform for any fraudulent or misleading purpose.`,
        `Impersonate any person or entity.`,
        `Damage, disable, or impair the operation of the RideLynk Platform.`,
        `Attempt to gain unauthorized access to any portion of the Platform.`,
        `Use any automated system or software to extract data from the Platform ("scraping").`,
        `Discriminate against anyone on the basis of race, religion, national origin, disability, sexual orientation, sex, marital status, gender identity, age, or any other characteristic protected under applicable law.`,
        `Transport unaccompanied minors or unaccompanied goods.`,
      ],
    },
    {
      id: 7,
      heading: 'Payments and Charges',
      description: '',
      subterms: [
        `7.1 Charges. You are responsible for all Charges incurred under your User Account. Charges include Fares (quoted or variable), applicable fees, tolls, surcharges, taxes, and any tips you elect to pay.`,
        `7.2 Quotes. Quoted Fares are subject to change until a ride is confirmed. Variable Fares are calculated based on time and distance.`,
        `7.3 Additional Fees. Additional fees may apply, including Cancellation Fees, Damage Fees, and Abuse Fees.`,
        `7.4 Payment Authorization. You authorize RideLynk to charge your designated payment method for all incurred Charges.`,
        `7.5 No Refunds. All Charges are non-refundable except as required by law.`,
        `7.6 Coupons. Any coupons or credits provided are valid only for use on the Platform, subject to specific terms, and are not transferable or redeemable for cash.`,
      ],
    },
    {
      id: 8,
      heading: 'Driver Terms',
      description: '',
      subterms: [
        `8.1 Driver Addendum. Drivers are subject to the additional terms of the Driver Addendum, which is incorporated into this Agreement by reference.`,
        `8.2 Representations and Warranties. By providing Rideshare Services, you represent and warrant that you: (a) possess a valid driver's license and all necessary authorizations; (b) maintain valid and adequate insurance; (c) own or have legal right to operate your vehicle, which is in safe and legal operating condition; and (d) will comply with all applicable laws and RideLynk policies.`,
        `8.3 Relationship. Drivers are independent contractors and not employees, agents, or joint venturers of RideLynk.`,
      ],
    },
    {
      id: 9,
      heading: 'Intellectual Property',
      description: '',
      subterms: [
        `9.1 Ownership. The RideLynk Platform, including all content, software, and trademarks ("RideLynk Marks"), is the exclusive property of RideLynk and its licensors and is protected by intellectual property laws.`,
        `9.2 License to RideLynk. You grant RideLynk a worldwide, royalty-free, sublicensable license to use, host, store, and display Your Information for the purpose of operating, improving, and promoting the Platform.`,
        `9.3 Driver License. RideLynk grants Drivers a limited, revocable, non-exclusive license to display RideLynk Marks solely on RideLynk-branded items provided by RideLynk for the purpose of providing Rideshare Services.`,
      ],
    },
    {
      id: 10,
      heading: 'Communications',
      description: `By creating an account, you consent to receive operational and promotional communications (e.g., emails, SMS, push notifications) from RideLynk. You may opt-out of promotional communications at any time. Standard message and data rates may apply.`,
      subterms: [],
    },
    {
      id: 11,
      heading: 'Privacy',
      description: `Your privacy is important to us. Our collection and use of your personal information is governed by our Privacy Policy.`,
      subterms: [],
    },
    {
      id: 12,
      heading: 'Disclaimer of Warranties',
      description: `The RideLynk platform is provided "as is" and "as available" without warranties of any kind, either express or implied. To the fullest extent permissible by law, RideLynk disclaims all warranties, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement. RideLynk does not guarantee the quality, suitability, safety, or ability of third-party providers, including drivers.`,
      subterms: [],
    },
    {
      id: 13,
      heading: 'Limitation of Liability',
      description: `To the maximum extent permitted by applicable law, RideLynk shall not be liable for any indirect, incidental, special, exemplary, punitive, or consequential damages arising out of or related to your use of the platform, including loss of data, loss of profits, or service interruption, even if RideLynk has been advised of the possibility of such damages.`,
      subterms: [],
    },
    {
      id: 14,
      heading: 'Indemnification',
      description: `You agree to indemnify and hold harmless RideLynk and its officers, directors, employees, and agents from any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including reasonable attorney's fees) arising from: (a) your use of the Platform; (b) your breach of this Agreement; or (c) your violation of any law or the rights of a third party.`,
      subterms: [],
    },
    {
      id: 15,
      heading: 'Term and Termination',
      description: `This Agreement is effective upon your acceptance and remains in effect until terminated. You may terminate this Agreement by closing your account. RideLynk may terminate or suspend your access to the Platform immediately, without notice, for any reason, including if you breach this Agreement.`,
      subterms: [],
    },
    {
      id: 16,
      heading: 'Governing Law',
      description: `This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles.`,
      subterms: [],
    },
    {
      id: 17,
      heading: 'Dispute Resolution and Arbitration Agreement (MANDATORY)',
      description: '',
      subterms: [
        `17.1 Agreement to Arbitrate. You and RideLynk mutually agree to resolve any disputes through final and binding arbitration on an individual basis, rather than in court. This includes any claims arising from this Agreement or your use of the Platform.`,
        `17.2 Waiver of Class Actions. You and RideLynk agree that each may bring claims against the other only in your or its individual capacity, and not as a plaintiff or class member in any purported class or representative proceeding.`,
        `17.3 Opt-Out for Drivers. Drivers and Driver applicants have the right to opt-out of this arbitration agreement for certain claims by providing written notice to RideLynk within 30 days of agreeing to these Terms.`,
        `17.4 Process. A party intending to seek arbitration must first send a written notice of the dispute to the other party. The arbitration will be administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules.`,
        `17.5 Exceptions. This arbitration agreement does not preclude you from bringing an individual action in small claims court or bringing issues to the attention of federal, state, or local agencies.`,
      ],
    },
    {
      id: 18,
      heading: 'General Provisions',
      description: '',
      subterms: [
        `18.1 Entire Agreement. This Agreement constitutes the entire agreement between you and RideLynk and supersedes all prior agreements.`,
        `18.2 Severability. If any provision of this Agreement is found to be unenforceable, the remaining provisions will remain in full force and effect.`,
        `18.3 No Waiver. RideLynk's failure to enforce any right or provision in this Agreement shall not constitute a waiver of such right or provision.`,
        `18.4 Assignment. You may not assign or transfer this Agreement without RideLynk's prior written consent. RideLynk may assign this Agreement without restriction.`,
        `18.5 Notices. RideLynk may provide notices to you via email, through the Platform, or by other reasonable means.`,
        `18.6 Modifications. RideLynk reserves the right to modify this Agreement at any time. Modifications will be effective upon posting. Your continued use of the Platform constitutes acceptance of the modified terms.`,
        // `Contact Information: RideLynk Inc., 2018 156th Ave NE, Building F, Suite 172, Bellevue, WA 98007, Email: Support@RideLynk.com, Phone: (712) 259-4334.`,
      ],
    },
  ];

  return (
    <SafeAreaView>
      
      <Header
        title={'Terms & COndition'  }
        showBack={isSignup ? true : false}
        hideUser={true}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: 'white',
          // marginTop: windowHeight * 0.1,
        }}
        contentContainerStyle={
          {
            // padding : moderateScale(10,0.6),
          }
        }>
        <CustomText
          isBold
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            textTransform: 'none',
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          {' 1. Acceptance of Terms '}
        </CustomText>
        <CustomText
          style={{
            // marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            textTransform: 'none',
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          This Terms of Service agreement ("Agreement") constitutes a legally
          binding contract between you and RideLynk, Inc., its parents,
          subsidiaries, representatives, affiliates, officers, and directors
          (collectively, "RideLynk," "we," "us," or "our"). This Agreement
          governs your access to and use of the RideLynk applications, websites,
          technology, artificial intelligence tools, facilities, and platform
          (collectively, the "RideLynk Platform")
        </CustomText>
        <CustomText
          isBold
          style={{
            marginTop: moderateScale(10, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            textTransform: 'none',
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          PLEASE READ THIS AGREEMENT CAREFULLY, AS IT CONTAINS IMPORTANT
          INFORMATION REGARDING YOUR LEGAL RIGHTS, INCLUDING A DISPUTE
          RESOLUTION CLAUSE THAT REQUIRES BINDING ARBITRATION ON AN INDIVIDUAL
          BASIS INSTEAD OF JURY TRIALS OR CLASS ACTIONS (SEE SECTION 17).
        </CustomText>
        <CustomText
          style={{
            // marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            textTransform: 'none',
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          By creating an account, accessing, or using the RideLynk Platform, you
          expressly acknowledge that you have read, understood, and agree to be
          bound by all terms and conditions of this Agreement. If you do not
          agree to these terms, you may not use the RideLynk Platform.
        </CustomText>
        {terms.map((term, index) => {
          return <TernsComponent termData={term} />;
        })}
        <View style={styles.contactContainer}>
          <Icon as={Entypo} color={Color.black} name="mail" />
          <CustomText style={{color: Color.black}}>
            {'Support@ridelynk.com'}
          </CustomText>
        </View>
        <View style={styles.contactContainer}>
          <Icon as={FontAwesome6} color={Color.red} name="phone" />
          <CustomText style={{color: Color.black}}>
            {'(712) 259-4334'}
          </CustomText>
        </View>
        <View style={{height: windowHeight * 0.045}} />
        <View style={{height: windowHeight * 0.05}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditions;

const styles = ScaledSheet.create({
  back: {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    // position: 'absolute',
    // left: moderateScale(10, 0.6),
    // top: moderateScale(10, 0.6),
    zIndex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: Color.themeBlack,
    justifyContent: 'center',
  },
  contactContainer: {
    marginLeft: moderateScale(10, 0.2),
    marginTop: moderateScale(5, 0.2),
    flexDirection: 'row',
    gap: moderateScale(10, 0.2),
  },
});
