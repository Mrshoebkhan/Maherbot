import { useRef } from "react";

const ChatForm = ({ chatHistry, setChatHistry, generateBotResponse }) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessege = inputRef.current.value.trim();
        if (!userMessege) return;
        inputRef.current.value = "";

        // update chat history with the user messege 
        

        // setChatHistry((history) => [...history, { role: "user", text: userMessege }]),
        // // // update chat history with the user messege 
        // // setTimeout(() => setChatHistry((history) => [...history, { role: "model", text: "💡 Thinking..." }]),
        
        // // generateBotResponse([...chatHistry, { role: "user", text: `using the details provided above, please address this query: ${userMessege}` }]),
        // // 600);

        // setTimeout(() => {
        //     setChatHistry((history) => {
        //         const updatedHistory = [...history, { role: "model", text: "💡Thinking..." }];
        //         generateBotResponse(updatedHistory);  // ✅ Pass latest updatedHistory
        //         return updatedHistory;
        //     });
        // }, 600);

        setChatHistry((history) => [
            ...history, 
            { role: "user", text: userMessege }, // ✅ Add user message
            { role: "model", text: "💡Thinking..." } // ✅ Add thinking message
          ]);
          
          setTimeout(() => {
            generateBotResponse([
              ...chatHistry,
              { role: "user", text: userMessege }
            ]);
          }, 600);
          
    }


    return (
      <>
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder='Messege...' className="messege-input" required />
            <button className="material-symbols-rounded">arrow_upward</button>
        </form>
        </>
    )
}

export default ChatForm