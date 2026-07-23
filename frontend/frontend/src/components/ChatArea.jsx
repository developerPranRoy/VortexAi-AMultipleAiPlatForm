import {
    ArrowUp,
    Paperclip,
    Globe,
    SquareTerminal,
} from "lucide-react";

const messages = [
    {
        role: "user",
        content: "Build a scalable authentication microservice using Express and JWT.",
    },
    {
        role: "assistant",
        content: `I'll help you build this.

Plan:

• Create Express server
• Configure JWT authentication
• Connect MongoDB
• Add refresh token support
• Dockerize the application
• Generate API documentation

Router selected Coding Agent.

Generating project...`,
    },
];

const ChatArea = () => {
    return (
        <main className="flex-1 h-screen flex flex-col bg-[#0d1117]">

            {/* Header */}

            <div className="h-16 border-b border-[#21262d] flex items-center justify-between px-8">

                <div>
                    <h2 className="font-semibold text-white">
                        Authentication Service
                    </h2>

                    <p className="text-xs text-zinc-500 mt-1">
                        Claude Code Inspired Workspace
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#30363d] px-3 py-1.5 text-xs text-zinc-400">
                    <SquareTerminal size={14} />
                    Coding Agent
                </div>

            </div>

            {/* Conversation */}

            <div className="flex-1 overflow-y-auto px-10 py-8">

                <div className="max-w-4xl mx-auto space-y-10">

                    {messages.map((msg, index) => (

                        <div key={index}>

                            {msg.role === "user" ? (

                                <div>

                                    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
                                        YOU
                                    </p>

                                    <p className="text-lg leading-8 text-zinc-100">
                                        {msg.content}
                                    </p>

                                </div>

                            ) : (

                                <div>

                                    <div className="flex items-center gap-2 mb-4">

                                        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-semibold">
                                            V
                                        </div>

                                        <div>

                                            <p className="font-medium">
                                                VortexAI
                                            </p>

                                            <p className="text-xs text-green-400">
                                                Router → Coding Agent
                                            </p>

                                        </div>

                                    </div>

                                    <div className="space-y-4 text-[15px] leading-8 text-zinc-300 whitespace-pre-line">

                                        {msg.content}

                                    </div>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            </div>

            {/* Composer */}

            <div className="border-t border-[#21262d] px-8 py-6">

                <div className="max-w-4xl mx-auto">

                    <div className="rounded-2xl border border-[#30363d] bg-[#161b22]">

                        <textarea
                            rows={3}
                            placeholder="Ask VortexAI..."
                            className="w-full resize-none bg-transparent outline-none px-5 pt-5 text-zinc-200 placeholder:text-zinc-500"
                        />

                        <div className="flex items-center justify-between px-4 py-3 border-t border-[#30363d]">

                            <div className="flex gap-2">

                                <button className="p-2 rounded-lg hover:bg-[#21262d] transition">
                                    <Paperclip size={18} />
                                </button>

                                <button className="p-2 rounded-lg hover:bg-[#21262d] transition">
                                    <Globe size={18} />
                                </button>

                            </div>

                            <button className="h-10 w-10 rounded-xl bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition">

                                <ArrowUp size={18} />

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
};

export default ChatArea;