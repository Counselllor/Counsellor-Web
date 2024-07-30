import React, { useEffect } from "react";
import { createDirectLine, renderWebChat } from "botframework-webchat";
import AzurebotImg from "../../assets/azurebot.jpg";

const ChatBot = () => {
  useEffect(() => {
    const directLine = createDirectLine({
      secret: "7BvfwB7877k.bi4e-4SxmUQVEOwgB5oSsKREppWQpBePQTNqMOfXp_c",
    });

    renderWebChat(
      {
        directLine,
        userID: "YOUR_USER_ID_HERE",
        username: "YOUR_USERNAME_HERE",
        locale: "en-US",
        botAvatarInitials: "Bot",
        userAvatarInitials: "You",
      },
      document.getElementById("webchat")
    );
  }, []);

  const toggleChat = () => {
    const webchatElement = document.getElementById("webchat");
    const chatIconElement = document.querySelector(".chat-icon");

    if (webchatElement.style.display === "none") {
      webchatElement.style.display = "block";
      chatIconElement.style.display = "none";
    } else {
      webchatElement.style.display = "none";
      chatIconElement.style.display = "block";
    }
  };

  return (
    <>
      <div
        id="webchat"
        role="main"
        style={{
          display: "none",
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "400px",
          height: "500px",
          border: "none",
          backgroundColor: "#f0f0f0",
        }}
      ></div>
      <img
        className="chat-icon"
        src={AzurebotImg}
        alt="Chat Icon"
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          cursor: "pointer",
          width: "100px",
          borderRadius: "50%",
        }}
      />
    </>
  );
};

export default ChatBot;
