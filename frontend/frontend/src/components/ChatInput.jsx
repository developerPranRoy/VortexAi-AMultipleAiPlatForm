import { Mic, Paperclip, Send } from "lucide-react";

const ChatInput = () => {
    return (
        <div className="sticky bottom-0 w-full border-t border-white/10 bg-[#0b0d12]/95 backdrop-blur-xl p-4">
            <div className="mx-auto rounded-3xl border border-white/10 bg-[#13161d] shadow-2xl transition-all duration-300 focus-within:border-violet-500/40 focus-within:shadow-violet-500/10">
                <textarea
                    rows={3}
                    placeholder="Ask anything..."
                    className="
                        w-full
                        resize-none
                        bg-transparent
                        px-5
                        pt-5
                        text-sm
                        leading-7
                        text-slate-100
                        placeholder:text-slate-500
                        outline-none
                        [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden
                    "
                />

                <div className="flex items-center justify-between border-t border-white/5 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <button
                            className="
                                flex h-10 w-10 items-center justify-center
                                rounded-xl
                                text-slate-500
                                transition-all
                                hover:bg-white/5
                                hover:text-white
                            "
                        >
                            <Paperclip size={16} />
                        </button>

                        <button
                            className="
                                flex h-10 w-10 items-center justify-center
                                rounded-xl
                                text-slate-500
                                transition-all
                                hover:bg-white/5
                                hover:text-white
                            "
                        >
                            <Mic size={16} />
                        </button>
                    </div>

                    <button
                        className="
                            flex h-11 w-11 items-center justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-violet-500
                            via-fuchsia-500
                            to-indigo-600
                            text-white
                            shadow-lg
                            shadow-violet-500/20
                            transition-all
                            duration-200
                            hover:scale-105
                            hover:shadow-violet-500/40
                            active:scale-95
                        "
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;