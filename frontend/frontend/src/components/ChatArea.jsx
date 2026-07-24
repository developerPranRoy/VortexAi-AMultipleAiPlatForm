
import Nav from "./Nav";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";


const ChatArea = () => {
    return (
        <main className="flex-1 h-screen flex flex-col bg-[#0d1117]">
            <Nav></Nav>
            <MessageList></MessageList>
            <ChatInput></ChatInput>





        </main>
    );
};

export default ChatArea;