import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageBubble from "./MessageBubble";

const MessageList = ({ onSelectPrompt }) => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { messages = [] } = useSelector((state) => state.message);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const showEmptyState = messages.length === 0 || !selectedConversation;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {showEmptyState ? (
        <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[20px] font-semibold text-slate-200 tracking-tight">
              VortexAi
            </h1>
            <p className="text-[16px] font-semibold text-slate-400 tracking-tight">
              How Can I help you?
            </p>
            <p className="text-[13px] text-slate-500 max-w-[260px] leading-relaxed">
              Ask me anything - code, ideas, explanations, or just quick questions.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-1">
            {["Write a netflix clone", "Explain redis", "Build a dashboard"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => onSelectPrompt && onSelectPrompt(suggestion)}
                  className="text-[12px] text-slate-400 border bg-white/[0.04] border-white/[0.07] px-3 py-1.5 rounded-lg hover:bg-white/[0.08] hover:text-slate-200 transition-colors duration-150 cursor-pointer"
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {messages.map((msg, ind) => (
            <MessageBubble
              key={msg.id || ind}
              role={msg?.role}
              content={msg?.content}
              images={msg?.images || []}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default MessageList;