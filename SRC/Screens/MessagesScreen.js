import { Pusher } from '@pusher/pusher-websocket-react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import {
  Actions,
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import { baseUrl } from '../Config';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { current } from '@reduxjs/toolkit';


const MessagesScreen = ({ route }) => {
  const focused = useIsFocused();
  const { data } = route.params;
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log("🚀 ~ MessagesScreen ~ userData:", userData?.id)
  const token = useSelector(state => state.authReducer.token);
  const pusher = Pusher.getInstance();
  const myChannel = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  console.log("🚀 ~ MessagesScreen ~ messages:", messages)
  const [loading, setIsLoading] = useState(false);
  const user_type = useSelector(state => state.authReducer.user_type);

  // useEffect(() => {
  //   console.log('useEffect runs');
  //   async function connectPusher() {
  //     try {
  //       await pusher.init({
  //         apiKey: '2cbabf5fca8e6316ecfe',
  //         cluster: 'ap2',
  //         forceTLS: true,
  //         encrypted: true,
  //       });

  //       myChannel.current = await pusher.subscribe({
  //         channelName: `my-channel-${userData?.id}`,
  //         onSubscriptionSucceeded: channelName => {
  //           console.log(`And here are the channel members: ${myChannel}`);
  //           console.log(
  //             `Subscribed to ${JSON.stringify(channelName, null, 2)}`,
  //           );
  //         },
  //         onEvent: event => {
  //           console.log('Got channel event:', event.data);
  //           try {
  //             const dataString = JSON.parse(event.data);
  //             console.log('🚀 ~ Received Message:', dataString?.message);
  //             if (dataString?.message?.target_id === userData?.id) {
  //               setMessages(previousMessages =>
  //                 GiftedChat.append(previousMessages, dataString?.message),
  //               );
  //             }
  //           } catch (error) {
  //             console.error('Error parsing event data:', error);
  //           }
  //         },
  //       });
  //       await pusher.connect();
  //       console.log('Pusher Connection State:', pusher.connectionState);
  //     } catch (e) {
  //       console.log(`ERROR: ${e}`);
  //     }
  //   }
  //   // connectPusher();
  //   getChatListingData();
  //   if (pusher.connectionState == 'DISCONNECTED') {
  //     connectPusher();
  //   }
  //   return async () => {
  //     await pusher.unsubscribe({ channelName: `my-channel-${userData?.id}` });
  //   };
  // }, [focused]);


  useEffect(() => {
    const connectPusher = async () => {
      try {
        console.log('Initializing Pusher...');
        await pusher.init({
          apiKey: '2cbabf5fca8e6316ecfe',
          cluster: 'ap2',
          encrypted: true,
        });

        await pusher.connect();
        console.log('Pusher Connected!');
        myChannel.current = await pusher.subscribe({
          channelName: `my-channel-${userData?.id}`,
          onSubscriptionSucceeded: (channelName) => {
            console.log(`Subscribed to ${channelName}`);
          },
          onEvent: (event) => {
            console.log('Received Event:', event);
            try {
              const dataString = JSON.parse(event.data);
              console.log('🚀 ~ Message:', dataString?.message);
              if (!dataString?.message?._id) {
                dataString.message._id = Math.random().toString(36).substring(7);
              }
              if (dataString?.message?.target_id === userData?.id) {
                getChatListingData()
                setMessages(previousMessages =>
                  GiftedChat.append(previousMessages, dataString?.message),
                );
              }
              console.log('Pusher Connection State:', pusher.connectionState.state);
            } catch (error) {
              console.error('Error parsing event data:', error);
            }
          },
        });

      } catch (error) {
        console.error('Pusher Connection Error:', error);
      }
      getChatListingData()
    };

    connectPusher();

    return () => {
      if (myChannel.current) {
        pusher.unsubscribe({ channelName: `my-channel-${userData?.id}` });
      }
    };
  }, [focused]);


  const startChat = async body => {
    console.log('🚀 ~ startChat ~ body:', body);
    const url = 'auth/send_message';
    try {
      const response = await Post(url, body, apiHeader(token));
      console.log("🚀 ~ API Response:", response?.data);

      if (!response || response.error) {
        console.error('Send Message API Error:', response?.error || 'No response');
      }
    } catch (error) {
      console.error('Send Message API Failed:', error);
    }
  };

  const getChatListingData = async () => {
    console.log('Fetching chat list...');
    const url = `auth/message_list?user_id=${userData?.id}&target_id=${data?.ride_info?.rider?.id}&chat_id=${userData?.id}`;
    setIsLoading(true);
    try {
      const response = await Get(url, token);
      console.log('🚀 ~ getChatListingData ~ response:', response?.data?.data);
      if (!response?.data?.data) {
        console.error('No chat data found.');
        return;
      }
      const formattedMessages = response?.data?.data?.map(msg => ({
        _id: msg.id,
        text: msg.text,
        createdAt: new Date(msg.created_at),
        user: {
          _id: msg.user_id,
          name: JSON.parse(msg.user).name,
        },
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Chat List Fetch Failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSend = useCallback(
    (messages = []) => {
      if (!messages?.length) return;
      const newMessage = {
        _id: Math.random().toString(36).substring(7),
        text: messages[0].text,
        createdAt: new Date(),
        user: {
          _id: userData?.id,
          name: userData?.name,
          avatar: baseUrl + userData?.photo,
        },
      };
      console.log("🚀 ~ Sending Message:", newMessage);
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessage),
      );
      startChat({
        user_id: userData?.id,
        target_id: data?.ride_info?.rider?.id,
        ...newMessage,
      });
    },
    [messages]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
      <Header headerColor={['white', 'white']} title={'Chat'} showBack={true} />
      <GiftedChat
        textInputStyle={{
          color: Color.black,
          marginTop: moderateScale(5, 0.3),
        }}
        placeholderTextColor={Color.darkGray}
        messages={messages}
        isTyping={false}
        alignTop
        renderActions={props => {
          return (
            <Actions
              {...props}
              icon={() => (
                <Icon
                  as={MaterialCommunityIcons}
                  name="sticker-emoji"
                  size={26}
                  color={Color.darkBlue}
                />
              )}
              iconTextStyle={{
                color: Color.black,
                fontSize: moderateScale(24, 0.2),
                textAlign: 'center',
              }}
              containerStyle={{
                bottom: -8,
                left: 2,
                width: windowWidth * 0.11,
                height: windowWidth * 0.11,
                borderRadius: (windowWidth * 0.11) / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          );
        }}
        renderSend={props => {
          return (
            <Send
              {...props}
              containerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: moderateScale(15, 0.6),
                width: moderateScale(30, 0.6),
                bottom: 3,
              }}>
              <Icon
                name="send"
                as={Feather}
                size={moderateScale(22)}
                color={Color.black}
              />
            </Send>
          );
        }}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                backgroundColor: Color.lightGrey,
                height: moderateScale(50, 0.6),
                justifyContent: 'center',
                marginHorizontal: moderateScale(6, 0.6),
                borderRadius: moderateScale(12, 0.6),
                bottom: 10,
                marginTop: moderateScale(15, 0.6)
              }}>
              <Composer
                {...props}
                textInputStyle={{
                  flex: 1,
                  color: 'black',
                  padding: 10,
                  alignSelf: 'flex-start',
                }}></Composer>
            </InputToolbar>
          );
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              containerStyle={{
                left: {
                  paddingVertical: moderateScale(10, 0.6),
                }
              }}
              wrapperStyle={{
                left: {
                  width: windowWidth * 0.45,
                  borderRadius: moderateScale(6, 0.2),
                  backgroundColor: Color.lightBlue,
                  alignItems: 'center',
                  paddingVertical: moderateScale(8, 0.5),
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 0,
                },
                right: {
                  width: windowWidth * 0.45,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  backgroundColor: Color.blue,
                  paddingVertical: moderateScale(8, 0.5)
                },
              }}
              textStyle={{
                right: {
                  color: 'black',
                },
                left: {
                  color: 'black',

                },
              }}></Bubble>
          );
        }}
        onSend={text => onSend(text)}
        alwaysShowSend={true}
        user={{
          _id: userData?.id,
          name: userData?.name,
          // avatar: `${baseUrl}/${profileData?.photo}`,
        }}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = ScaledSheet.create({
  header: {
    color: Color.black,
    fontSize: moderateScale(18, 0.3),
    width: windowWidth * 0.9,
  },
  image: {
    marginHorizontal: moderateScale(10, 0.3),
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: windowWidth * 0.7,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
  row: {
    width: windowWidth,
    height: windowHeight * 0.06,
    paddingHorizontal: moderateScale(20, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(20, 0.6),
    justifyContent: 'space-between',
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
    marginTop: moderateScale(-3, 0.6),
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  avatar: {
    marginRight: 8,
    backgroundColor: 'red',
  },
  bubble: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
  },
  userName: {
    fontWeight: 'bold',
    color: '#007aff', // Adjust color for the name
  },
  messageText: {
    color: '#333333',
  },
});
