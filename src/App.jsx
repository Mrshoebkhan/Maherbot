import React, { useEffect, useRef, useState } from 'react'
import ChatbotIcon from './components/chatbotIcon'
import ChatForm from './components/ChatForm'
import ChatMessege from './components/ChatMessege';
import { collegeData } from './collegeData'
import CustomCursor from './components/CustomCursor';
import { Tooltip as ReactTooltip } from "react-tooltip";



const App = () => {
  const [chatHistry, setChatHistry] = useState([{
    hideInChat : true,
    role : "model",
    text: collegeData
  }
  ]);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistry((prev) => [
        ...prev.filter((msg) => msg.text !== "💡Thinking..."), 
        { role: "model", text, isError }
      ]);
    };
  
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };
  
    try {
      const response = await fetch(import.meta.gitignore.VITE_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Something went wrong!");
  
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      
      // ✅ Remove "Thinking..." and add the actual bot reply
      updateHistory(apiResponseText);
  
    } catch (error) {
      updateHistory(error.message, true);
    }
  };


  useEffect(() => {
    //Auto-scoll whenever chat history updates
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight,behavior:"smooth"});
  }, [chatHistry])


  return (
    <div className="container">
      <button>I am Branch</button>
      <CustomCursor/>
      <div className="chatbot-popup">
        {/* ChatBot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className='logo-text'>Maherbot</h2>

            <button id='userlogin' data-tooltip-id='my-tooltip' className="material-symbols-outlined">account_circle</button>
            <ReactTooltip id="my-tooltip" place="top" content="Profile" />


          </div>
        </div>
        {/* ChatBot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className='message-text'>
              Hey there <br /> How can I help you today?
            </p>
          </div>
          {/* Render the caht history dynamically */}
          {chatHistry.map((chat, index) => (
            <ChatMessege key={index} chat={chat} />
          ))}
        </div>
        {/* ChatBot footer */}
        <div className="chat-footer">
          <ChatForm chatHistry={chatHistry} setChatHistry={setChatHistry} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  )
}

export default App