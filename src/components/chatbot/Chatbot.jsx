import React, { useEffect, useState } from 'react';
import BotPic from '../../assets/azurebot.jpg';
import './chatbot.css';

const Chatbot = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const [webChatInstance, setWebChatInstance] = useState(null);

  const initializeWebChat = () => {
    const store = window.WebChat.createStore({}, ({ dispatch }) => next => action => {
      if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
        dispatch({
          type: 'WEB_CHAT/SEND_EVENT',
          payload: { name: 'webchat/join', value: { language: 'en' } }
        });
      }
      return next(action);
    });

    const webChatInstance = window.WebChat.renderWebChat(
      {
        directLine: window.WebChat.createDirectLine({
          secret: '7BvfwB7877k.bi4e-4SxmUQVEOwgB5oSsKREppWQpBePQTNqMOfXp_c',
        }),
        store,
        userID: 'YOUR_USER_ID_HERE',
        username: 'YOUR_USERNAME_HERE',
        locale: 'en-US',
        styleOptions: {
          bubbleBackground: '#0078d4',
          bubbleTextColor: 'white',
          bubbleFromUserBackground: '#0078d4',
          bubbleFromUserTextColor: 'white',
          backgroundColor: '#f9f9f9',
          sendBoxBackground: '#f1f1f1',
          sendBoxButtonColor: '#0078d4',
          sendBoxTextColor: 'black',
          userAvatarInitialsBackground: '#0078d4',
          botAvatarInitialsBackground: '#e0e0e0',
        },
      },
      document.getElementById('webchat')
    );

    setWebChatInstance(webChatInstance);
  };

  useEffect(() => {
    if (chatVisible) {
      if (!window.WebChat) {
        const script = document.createElement('script');
        script.src = 'https://cdn.botframework.com/botframework-webchat/latest/webchat.js';
        script.async = true;
        script.onload = initializeWebChat;
        document.body.appendChild(script);
      } else {
        initializeWebChat();
      }
    } else if (webChatInstance) {
      // Cleanup WebChat instance
      webChatInstance.cleanup();
      setWebChatInstance(null);
      document.getElementById('webchat').innerHTML = '';
    }
  }, [chatVisible]);

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  return (
    <div>
      <img
        className="chat-icon"
        src={BotPic}
        onClick={toggleChat}
        alt="Chatbot Icon"
        style={{ display: chatVisible ? 'none' : 'block' }}
      />
      <div id="chat-container" style={{ display: chatVisible ? 'block' : 'none' }}>
        <div className="chat-header">
          <span className="chat-title">Counsellor Portal</span>
          <span className="close-icon" onClick={toggleChat}>&times;</span>
        </div>
        <div id="webchat" className="chat-body"></div>
      </div>
    </div>
  );
};

export default Chatbot;
