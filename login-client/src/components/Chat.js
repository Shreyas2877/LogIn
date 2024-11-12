import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Card, TextField, List, ListItemText, Avatar, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { useLocation, useNavigate, Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { fetchMessages, fetchProfileController } from "../controllers/authController";

const StyledCard = styled(Card)`
  margin-top: 20px;
  background-color: #1e1f24;
  color: #dcdcdc;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  height: 80vh;
`;

const ChatHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background-color: #3a3b3f;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 12px 12px 0 0;
`;

const StyledAvatar = styled(Avatar)`
  background-color: #7289da;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: #5865f2;
  }
`;

const MessageList = styled(List)`
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: #2f3136;
  scrollbar-width: thin;
  scrollbar-color: #5865f2 transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #5865f2;
    border-radius: 8px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`;

const MessageBubbleContainer = styled(Box)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  ${({ isUser }) =>
    isUser ? `flex-direction: row-reverse;` : `flex-direction: row;`}
`;

const MessageBubble = styled(Box)`
  padding: 0.5px 15px;
  border-radius: 20px;
  max-width: 70%;
  ${({ isUser }) =>
    isUser
      ? `
        background-color: #7289da;
        color: white;
        border-radius: 20px 20px 0 20px;
        align-self: flex-end;
      `
      : `
        background-color: #40444b;
        color: #dcdcdc;
        border-radius: 20px 20px 20px 0;
      `}
`;

const AvatarWrapper = styled(Box)`
  margin: ${({ isUser }) => (isUser ? "0 0 0 8px" : "0 8px 0 0")};
`;

const ChatInputContainer = styled(Box)`
  display: flex;
  align-items: center;
  background-color: #40444b;
  padding: 8px;
  border-radius: 0 0 12px 12px;
`;

const ChatInput = styled(TextField)`
  flex-grow: 1;
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    background-color: #40444b;
    color: #b9bbbe;
    padding: 10px;
    fieldset {
      border: none;
    }
    &:hover fieldset,
    &.Mui-focused fieldset {
      border-color: #7289da;
    }
  }
`;

const SendButton = styled(IconButton)`
  color: #7289da;
  &:hover {
    color: #5865f2;
  }
`;

const EmptyMessageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #72767d;
`;

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const ChatPage = () => {
  const location = useLocation();
  const { username, userid } = location.state || {
    username: "Guest",
    userid: null,
  };
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const result = await fetchProfileController();
      if (!result.success) {
        if (result.statusCode === 401) {
          navigate("/login"); // Redirect to login page
        }
      }
    };
    getProfile();
  }, [navigate]);

  useEffect(() => {
    const loadMessages = async () => {
      const result = await fetchMessages();
      if (result.success) {
        setMessages(result.data); // Only fetch once
      } else {
        console.error("Failed to fetch messages:", result.message);
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8084/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe('/topic/public', (message) => {
        if (message.body) {
          const incomingMessage = JSON.parse(message.body);

          // Avoid adding duplicate messages from WebSocket
          setMessages((prevMessages) => {
            // Check if the message with the same timestamp exists
            if (!prevMessages.some((msg) => msg.timestamp === incomingMessage.timestamp)) {
              return [...prevMessages, incomingMessage];
            }
            return prevMessages; // Return without adding if duplicate
          });
        }
      });
    });

    setStompClient(client);

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() && stompClient && stompClient.connected) {
      const timestamp = new Date().toISOString();
      const message = {
        senderName: username,
        content: newMessage,
        timestamp,
      };

    //   // Save the message to the backend first
    //   const response = await postMessage(userid, username, newMessage, timestamp);
    //   if (!response.success) {
    //     console.error("Failed to save message:", response.message);
    //     return;
    //   }

      // If the message was saved, send it through the WebSocket
      stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
      setNewMessage(""); // Clear input after sending
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Container maxWidth="sm">
      <StyledCard>
        <ChatHeader>
          EchoTrojan
          <StyledAvatar
            component={Link}
            to="/profile"
            state={{ username, userid }}
          >
            {username ? username[0].toUpperCase() : "G"}
          </StyledAvatar>
        </ChatHeader>
        <MessageList>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <React.Fragment key={index}>
                <MessageBubbleContainer
                  isUser={message.senderName === username}
                  sx={{ mb: 2 }}
                >
                  <AvatarWrapper isUser={message.senderName === username}>
                    <Tooltip title={message.senderName} arrow>
                      <Avatar sx={{ bgcolor: "#7289da" }}>
                        {message.senderName
                          ? message.senderName[0].toUpperCase()
                          : "U"}
                      </Avatar>
                    </Tooltip>
                  </AvatarWrapper>
                  <MessageBubble isUser={message.senderName === username}>
                    <ListItemText primary={message.content} />
                    <Typography
                      variant="caption"
                      color="#b0b0b0"
                      align="right"
                      display="block"
                      sx={{ mt: 1 }}
                    >
                      {formatTimestamp(message.timestamp)}
                    </Typography>
                  </MessageBubble>
                </MessageBubbleContainer>
              </React.Fragment>
            ))
          ) : (
            <EmptyMessageContainer>
              <ChatBubbleOutlineIcon sx={{ fontSize: 50, color: "#5865f2" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                No messages yet. Say hi!
              </Typography>
            </EmptyMessageContainer>
          )}
        </MessageList>
        <ChatInputContainer>
          <ChatInput
            fullWidth
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <SendButton onClick={handleSendMessage}>
            <SendIcon />
          </SendButton>
        </ChatInputContainer>
      </StyledCard>
    </Container>
  );
};

export default ChatPage;
