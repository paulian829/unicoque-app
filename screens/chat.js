import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'




var responses = {
  'match':'You Send Match',
  'search': "You send Search"
}

export default function Chat() {
  const [messages, setMessages] = useState([]);

  

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])



  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    let messageTxt = messages[0].text
    let messages_tokens = messageTxt.toLowerCase().split(" ")
    messages_tokens.forEach(function (msg, index) {
      if (msg in responses){
        setMessages(previousMessages => GiftedChat.append(previousMessages, [
          {
            _id: messages.length + 1,
            text: responses[msg],
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ]))
        return
      }
      setMessages(previousMessages => GiftedChat.append(previousMessages, [
        {
          _id: messages.length + 1,
          text: "notfound",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ]))
    });
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}