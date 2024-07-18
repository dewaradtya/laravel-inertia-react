import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

const Chat = ({ isOpen, toggleChat }) => {
    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState([]);

    const handleSendMessage = () => {
        if (message.trim() === "") return;

        router.post(
            "/chat",
            { message },
            {
                onSuccess: ({ props }) => {
                    setChatLog([
                        ...chatLog,
                        { sender: "You", text: message },
                        { sender: "Chatbot", text: props.response },
                    ]);
                    setMessage("");
                },
            }
        );
    };

    useEffect(() => {
        // Reset chat log when chat is closed
        if (!isOpen) {
            setChatLog([]);
        }
    }, [isOpen]);

    return (
        <div
            className={`fixed bottom-20 right-4 z-50 max-w-xs w-full ${
                isOpen ? "" : "hidden"
            }`}
        >
            <div className="bg-purple-100 p-6 rounded-3xl shadow-md">
                <div className="flex items-center p-2 border rounded-full mb-4 bg-purple-800">
                    <img
                        src={"/img/default.jpg"}
                        alt="Bot Avatar"
                        className="w-8 h-8 rounded-full mr-3"
                    />
                    <h1 className=" text-white font-bold">School bot</h1>
                </div>
                <div className="overflow-y-auto h-64 border-b border-gray-800 mb-4">
                    {chatLog.map((log, index) => (
                        <div
                            key={index}
                            className={`my-2 ${
                                log.sender === "You"
                                    ? "text-right"
                                    : "text-left"
                            }`}
                        >
                            <span className="font-bold">{log.sender}:</span>{" "}
                            <span>{log.text}</span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-full px-3 py-2 mr-2"
                        placeholder="Ketik pesan..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-purple-800 text-white px-2 py-1 rounded-full"
                    >
                        <span className="material-icons">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
