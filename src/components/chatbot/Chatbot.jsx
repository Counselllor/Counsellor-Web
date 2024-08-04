import React, { useEffect, useState } from 'react';
import BotPic from '../../assets/azurebot.jpg';

import './chatbot.css';

const Chatbot = () => {
  const [chatVisible, setChatVisible] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botframework.com/botframework-webchat/latest/webchat.js';
    script.async = true;
    script.onload = () => {
      if (chatVisible) {
        window.WebChat.renderWebChat(
          {
            directLine: window.WebChat.createDirectLine({
              secret: '7BvfwB7877k.bi4e-4SxmUQVEOwgB5oSsKREppWQpBePQTNqMOfXp_c',
            }),
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

        window.WebChat.waitForBotConnection(async () => {
          await window.WebChat.sendEvent({
            name: 'webchat/join',
            value: { language: 'en' },
          });
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
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
