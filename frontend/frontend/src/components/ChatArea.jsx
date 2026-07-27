
import Nav from "./Nav";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getMessage from "../../features/getMessage";
import { setMessages } from "../redux/messageSlice";


const ChatArea = () => {
    const { selectedConversation } = useSelector(state => state.conversation)
    const dispatch = useDispatch()
    useEffect(() => {
        const getMsg = async () => {
            if (selectedConversation) {
                const data = await getMessage(selectedConversation?._id)
                dispatch(setMessages(data))
            }

        }
        getMsg()
    }, [selectedConversation])
    return (
        <main className="flex-1 h-screen flex flex-col bg-[#0d1117]">
            <Nav></Nav>
            <MessageList></MessageList>
            <ChatInput></ChatInput>

        </main>
    );
};

export default ChatArea;