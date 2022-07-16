import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

var responses = {
  match:
    "You Send Match - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus interdum lectus. Vivamus fermentum accumsan dui sagittis aliquet. Vestibulum iaculis nisi dignissim fringilla gravida.",
  search:
    "You send Search -Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus interdum lectus. Vivamus fermentum accumsan dui sagittis aliquet. Vestibulum iaculis nisi dignissim fringilla gravida.",
  about:
    "About Us - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus interdum lectus. Vivamus fermentum accumsan dui sagittis aliquet. Vestibulum iaculis nisi dignissim fringilla gravida.",
  whoUseApp:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus interdum lectus. Vivamus fermentum accumsan dui sagittis aliquet. Vestibulum iaculis nisi dignissim fringilla gravida.",
  whoDevelopers:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus interdum lectus. Vivamus fermentum accumsan dui sagittis aliquet. Vestibulum iaculis nisi dignissim fringilla gravida.",
};

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello How can I help you?",
        createdAt: new Date(),
        quickReplies: {
          type: "radio", // or 'checkbox',
          keepIt: true,
          values: [
            {
              title: "How to Match Schools?",
              value: "match",
            },
            {
              title: "How to Search?",
              value: "search",
            },
            {
              title: "What is Unicoque?",
              value: "about",
            },
            {
              title: "Who can use this app?",
              value: "whoUseApp",
            },
            {
              title: "Who are the Developers?",
              value: "whoDevelopers",
            },
          ],
        },
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messagesReply = []) => {
    console.log(Object.keys(messages).length)
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: Object.keys(messages).length+ 1,
          text: messagesReply[0].title,
          user: {
            _id: 1,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
      ])
    );
    let messageTxt = messagesReply[0].value;
    setMessages((previousMessages) =>
    GiftedChat.append(previousMessages, [
      {
        _id: Object.keys(messages).length+ 1,
        text: responses[messageTxt],
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ])
  );
  }, []);

  return (
    <GiftedChat
      onQuickReply={(messages) => onSend(messages)}
      minComposerHeight={0}
      maxComposerHeight={0}
      minInputToolbarHeight={0}
      renderInputToolbar={() => null}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
