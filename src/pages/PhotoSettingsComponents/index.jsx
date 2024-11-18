// import React, { useEffect, useState } from "react";
// import HeaderComponent from "../../components/HeaderComponent";
// import { socket } from "../socket";

// const PhotoSettingsComponents = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");

//   useEffect(() => {
//     // Kết nối socket khi component mount
//     socket.connect();

//     // Lắng nghe sự kiện "receive_message" từ server
//     socket.on("receive_message", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     // Ngắt kết nối socket khi component unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (inputMessage.trim() !== "") {
//       // Gửi sự kiện "send_message" tới server
//       socket.emit("send_message", inputMessage);
//       setInputMessage(""); // Xóa input sau khi gửi
//     }
//   };

//   return (
//     <div>
//       <h2>Chat Room</h2>
//       <div className="chat-box">
//         {messages.map((msg, index) => (
//           <div key={index}>{msg}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={inputMessage}
//         onChange={(e) => setInputMessage(e.target.value)}
//         placeholder="Type your message..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };
// export default PhotoSettingsComponents;
