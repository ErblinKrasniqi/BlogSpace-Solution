import styles from "../Assets/scss/chat.module.scss";
import { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userIdApi, setUserIdApi] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const socket = openSocket("http://localhost:8080");
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      setUserIdApi(data.user);
      console.log(data);
      console.log("User ID: ", userId, "User ID API: ", userIdApi);
    });
    // eslint-disable-next-line
  }, []);

  const handleSendMessage = async () => {
    // const data = { message: message, user: userId };
    // setMessages([...messages, data]);

    try {
      await axios.post(
        "http://localhost:8080/api/message",
        { message: message },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(messages);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ opacity: "1" }} className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <h1 className={styles.chatTitle}>Support</h1>
        </div>
        <div className={styles.chatBody}>
          {messages ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={
                  userId !== msg.user ? styles.chatMessage : styles.chatMessageB
                }
              >
                <div
                  className={
                    userId !== msg.user
                      ? styles.chatMessageContent
                      : styles.chatMessageContentB
                  }
                >
                  <p
                    className={
                      userId !== msg.user
                        ? styles.chatMessageText
                        : styles.chatMessageTextB
                    }
                  >
                    {msg.message}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.chatMessage}>
              <div className={styles.chatMessageContent}>
                <p className={styles.chatMessageText}>Hello, world!</p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.chatFooter}>
          <input
            type="text"
            className={styles.chatInput}
            autoComplete="off"
            id="chat-input"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={() => handleSendMessage()}
            className={styles.chatButton}
          >
            Send
          </button>
        </div>
      </div>
      <div className={styles.clickToChat}>
        <p className={styles.clickToChatText}>Click to chat</p>
      </div>
    </div>
  );
};

export default Chat;
