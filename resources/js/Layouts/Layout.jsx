import React, { useState } from "react";
import Header from "../Components/Sidebar/header";
import Sidebar from "../Components/Sidebar/index";
import FlashMessage from "../Components/Messages/FlashMessage";
import Chat from "../Pages/chat";

export default function Layout({ children }) {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col relative">
                <Header />
                <main className="p-4 flex-grow">
                    <FlashMessage />
                    {children}
                </main>
                <Chat isOpen={showChat} toggleChat={toggleChat} />
                <button
                    onClick={toggleChat}
                    className={`material-icons fixed bottom-10 right-10 bg-purple-500 text-white px-3 py-3 rounded-full z-50 transition-all duration-300 transform ${
                        showChat ? "rotate-45 scale-90" : ""
                    } bottom-24`}
                >
                    chat
                </button>
            </div>
        </div>
    );
}
