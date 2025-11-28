import React, { useEffect, useRef, useState } from "react";
import { Bot, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { sendChatMessage } from "../api/chatbotApi";
import "./chatbot.css";
const renderText = (text) =>
  text.split(/\n{2,}/).map((block, idx) => (
    <p key={idx} className="mb-1 last:mb-0">
      {block}
    </p>
  ));

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          text:
            "Hi there! 👋 Welcome to ShopHub! I'm here to help you with your shopping experience. How can I assist you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    const textToSend = inputValue;
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    const botText = await sendChatMessage(textToSend);
    const botMsg = {
      id: `bot-${Date.now()}`,
      text: botText,
      sender: "bot",
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMsg]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  // context‑based quick replies (simple example)
  const baseChips = [ "Product Help", "Clothing", "Electronic Gadgets"];
  const suggestionChips = messages.length <= 2 ? baseChips : [];

  return (
    <>
      {/* Floating launcher */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chatbot-launcher"
        >
          <Bot className="w-6 h-6" />
          <span className="chatbot-launcher-badge">1</span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-panel-wrapper">
          <div
            className={`chatbot-panel ${isMinimized ? "chatbot-panel-min" : "chatbot-panel-full"}`}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-main">
                <div className="chatbot-avatar">
                  <Bot className="w-6 h-6 text-[#4f46e5]" />
                </div>
                <div>
                  <p className="chatbot-title">ShopHub Assistant</p>
                  <p className="chatbot-subtitle">Chat with us</p>
                  <p className="chatbot-status">
                    <span className="chatbot-status-dot" />
                    Online
                  </p>
                </div>
              </div>
              <div className="chatbot-header-actions">
                <button
                  onClick={() => setIsMinimized((v) => !v)}
                  className="chatbot-icon-btn"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="chatbot-icon-btn"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* vertical accent on right */}
                <div className="chatbot-right-accent" />

                {/* Messages */}
                <div className="chatbot-messages">
                  {messages.map((m) => (
                    <div key={m.id} className="chatbot-msg-row">
                      {m.sender === "bot" ? (
                        <div className="chatbot-msg-bot">
                          <div className="chatbot-msg-bubble-bot">
                            {renderText(m.text)}
                          </div>
                          <span className="chatbot-time">
                            {formatTime(m.timestamp)}
                          </span>
                        </div>
                      ) : (
                        <div className="chatbot-msg-user">
                          <div className="chatbot-msg-bubble-user">
                            {m.text}
                          </div>
                          <span className="chatbot-time">
                            {formatTime(m.timestamp)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="chatbot-msg-row">
                      <div className="chatbot-msg-bot">
                        <div className="chatbot-typing-bubble">
                          <span className="dot" />
                          <span className="dot delay-1" />
                          <span className="dot delay-2" />
                        </div>
                      </div>
                    </div>
                  )}

                  {suggestionChips.length > 0 && (
                    <div className="chatbot-chips-row">
                      {suggestionChips.map((label) => (
                        <button
                          key={label}
                          onClick={() => {
                            setInputValue(label);
                            handleSendMessage();
                          }}
                          className="chatbot-chip"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="chatbot-input-bar">
                  <div className="chatbot-input-wrap">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="chatbot-input"
                      disabled={isTyping}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="chatbot-send-btn"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
