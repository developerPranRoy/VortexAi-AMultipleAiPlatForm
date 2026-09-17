import { Code2, FileText, Globe, ImageIcon, MessageSquare, Mic, Paperclip, Presentation, Send, Zap } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sendMessage from "../../features/sendMessage";
import { addMessage } from "../redux/messageSlice";
import { createConversation } from "../../features/createConversation";
import saveMessage from "../../features/saveMessage";
import { addConversation, setConvTilte, setSelectedConversation, } from "../redux/conversationSlice";
import { updateConversation } from "../../features/updatecConversation";

const ChatInput = () => {
    const [value, setValue] = useState("");
    const [selectedAgent, setSelectedAgent] = useState("Auto")

    const { selectedConversation } = useSelector(
        (state) => state.conversation
    );

    const dispatch = useDispatch();

    const handleSendMessage = async () => {
        const prompt = value.trim();
        if (!prompt) return;
        try {
            let conversation = selectedConversation;

            if (!conversation) {
                const conv = await createConversation();
                if (!conv) {
                    console.error("Failed to create conversation.");
                    return;
                }
                dispatch(setSelectedConversation(conv));
                dispatch(addConversation(conv));
                conversation = conv;
            }
            if (conversation.title === "New Chat") {
                await updateConversation({
                    id: conversation._id, title: prompt,
                });

                dispatch(setConvTilte({
                    conversationId: conversation._id, title: value.slice(0, 40),
                })
                );
                conversation = {
                    ...conversation,
                    title: prompt,
                };
            }
            const payload = {
                prompt,
                conversationId: conversation._id, agent: selectedAgent.toLowerCase()
            };

            // console.log("Sending payload:", payload);

            dispatch(addMessage({ role: "user", content: value.trim(), })
            );
            await saveMessage({ conversationId: conversation._id, role: "user", content: prompt, });
            setValue("");
            const data = await sendMessage(payload);

            console.log("AI response:", data);
            if (data) {
                dispatch(addMessage({
                    role: "assistant", content: data.answer || "",
                    images: data.images || []
                })
                );
                await saveMessage({
                    conversationId: conversation._id, role: "assistant", content: data.answer, images: data.images,
                });
            }

        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const agents = [
        {
            id: "auto",
            icon: Zap,
            label: "Auto",
        },
        {
            id: "chat",
            icon: MessageSquare,
            label: "Chat",
        },
        {
            id: "search",
            icon: Globe,
            label: "Search",
        },
        {
            id: "coding",
            icon: Code2,
            label: "Coding",
        },
        {
            id: "pdf",
            icon: FileText,
            label: "PDF",
        },
        {
            id: "ppt",
            icon: Presentation,
            label: "PPT",
        },
        {
            id: "vision",
            icon: ImageIcon,
            label: "Image",
        },
    ];

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="sticky bottom-0 w-full border-t border-white/10 bg-[#0b0d12]/95 p-4 backdrop-blur-xl">
            <div className="mx-auto rounded-3xl border border-white/10 bg-[#13161d] shadow-2xl transition-all duration-300 focus-within:border-violet-500/40 focus-within:shadow-violet-500/10">

                <div className="flex w-[80%] gap-2 pr-2 flex-wrap">
                    {agents.map((agent) => {
                        const isActive = selectedAgent === agent.label;
                        const Icon = agent.icon;

                        return (
                            <div
                                onClick={() => setSelectedAgent(agent.label)}
                                key={agent.id}
                                className={`inline-flex items-center gap-1.5 px-3 mt-1 ml-1 py-2 rounded-full text-xs font-medium border transition-all 
                    cursor-pointer ${isActive
                                        ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8px_rgba(99,102,241,0.35)]"
                                        : "bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.07]"
                                    }`}
                            >
                                <Icon
                                    size={14}
                                    className={isActive ? "text-white" : "text-sky-500"}
                                />
                                <span>{agent.label}</span>
                            </div>
                        );
                    })}
                </div>

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