import { Mic, Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sendMessage from "../../features/sendMessage";
import { addMessage } from "../redux/messageSlice";

const ChatInput = () => {
    const [value, setValue] = useState("");


    const { selectedConversation } = useSelector(
        (state) => state.conversation
    );
    const { messages } = useSelector((state) => state.message);

    const dispatch = useDispatch()

    const handleSendMessage = async () => {
        const prompt = value.trim();

        if (!prompt) return;

        try {
            const payload = {
                prompt,
                conversationId: selectedConversation?._id,
            };

            dispatch(addMessage({ role: "user", content: prompt }))

            setValue("");

            const data = await sendMessage(payload);

            if (data) {
                dispatch(addMessage({ role: "assistant", content: data }))
            }

        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="sticky bottom-0 w-full border-t border-white/10 bg-[#0b0d12]/95 p-4 backdrop-blur-xl">
            <div className="mx-auto rounded-3xl border border-white/10 bg-[#13161d] shadow-2xl transition-all duration-300 focus-within:border-violet-500/40 focus-within:shadow-violet-500/10">
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={3}
                    placeholder="Ask anything..."
                    className="w-full resize-none bg-transparent px-5 pt-5 text-sm leading-7 text-slate-100 placeholder:text-slate-500 outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                />

                <div className="flex items-center justify-between border-t border-white/5 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-white/5 hover:text-white"
                        >
                            <Paperclip size={16} />
                        </button>

                        <button
                            type="button"
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-white/5 hover:text-white"
                        >
                            <Mic size={16} />
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleSendMessage}
                        disabled={!value.trim()}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-150 ${value.trim()
                                ? "bg-gradient-to-br from-fuchsia-500 to-violet-700 text-white hover:opacity-90"
                                : "cursor-not-allowed bg-white/[0.05] text-slate-600"
                            }`}
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;