import { Plus, PenSquare, MessageSquare, PanelLeftIcon, User, Coins, LogOut, PanelRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getConversations } from "../../features/getConversations";
import { createConversation } from "../../features/createConverssation";

import {
    addConversation,
    setConversation,
    setSelectedConversation,
} from "../redux/conversationSlice";
import { logout } from "../../features/logout";
import { setUserData } from "../redux/userSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const [collapse, setCollapse] = useState(false)
    const [imageError, setImageError] = useState(false)

    const { conversation: conversations, selectedConversation } = useSelector(
        (state => state.conversation)
    );
    const { userData } = useSelector(
        (state => state.user)
    );

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const data = await getConversations();

                if (data) {
                    dispatch(setConversation(data));
                }
            } catch (error) {
                console.error("Failed to fetch conversations:", error);
            }
        };

        fetchConversations();
    }, [userData?._id]), dispatch;

    const handleCreateConversation = async () => {
        try {
            const data = await createConversation();

            if (data) {
                dispatch(addConversation(data));
                dispatch(setSelectedConversation(data));
            }
        } catch (error) {
            console.error("Failed to create conversation:", error);
        }
    };

    if (collapse) {
        return (
            <div className=" hidden lg:flex flex-col w-[56px] h-screen bg-[#0d0f14] border-r border-white/[0.06] gap-1 shrink-0">

                <button onClick={() => {
                    setCollapse(false)
                }} className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 bg-transparent border-none cursor-pointer"><PanelRight></PanelRight></button>
                <button onClick={handleCreateConversation} className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 bg-transparent border-none cursor-pointer"><Plus size={17}></Plus>
                </button>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto px-3 pb-4">
                    <p className="mb-4 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Recent Chats
                    </p>

                    {conversations?.length > 0 ? (
                        <div className="space-y-1">
                            {conversations.map((chat) => (
                                <button
                                    key={chat._id}
                                    onClick={() => dispatch(setSelectedConversation(chat))}
                                    className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 ${selectedConversation?._id === chat._id
                                            ? "bg-[#1f6feb] text-white"
                                            : "text-zinc-300 hover:bg-[#161b22]"
                                        }`}
                                >
                                    <MessageSquare
                                        size={15}
                                        className={`shrink-0 ${selectedConversation?._id === chat._id
                                                ? "text-white"
                                                : "text-zinc-500 group-hover:text-zinc-300"
                                            }`}
                                    />

                                    <span className="truncate text-sm">
                                        {chat.title || "New Conversation"}
                                    </span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-zinc-800">
                            <p className="text-sm text-zinc-500">
                                No conversations yet
                            </p>
                        </div>
                    )}

                    <div className="mt-5 border-t border-zinc-800" />
                </div>

            </div>
        )
    }

    return (
        <aside className="w-[280px] h-screen bg-[#0d1117] border-r border-[#21262d] flex flex-col">
            {/* Header */}
            <div className="h-16 px-5 flex items-center justify-between border-b border-[#21262d]">
                <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06] ">
                    <div className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer" onClick={() => setCollapse(true)}>
                        <PanelLeftIcon></PanelLeftIcon>
                    </div>
                    <h1 className="text-lg font-semibold tracking-tight flex-1">
                        VortexAI
                    </h1>
                    <span className=" text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">free</span>

                    {/* <p className="text-xs text-zinc-500">
                        Multi Agent Platform
                    </p> */}
                </div>

                <button
                    onClick={handleCreateConversation}
                    className="flex tc items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors  duration-150 bg-transparent border-none cursor-pointer"
                >
                    <PenSquare size={16} />
                </button>
            </div>

            {/* New Chat */}
            <div className="p-4">
                <button
                    onClick={handleCreateConversation}
                    className="w-full text-blue-50 flex items-center justify-center gap-2 rounded-xl bg-blue-700 cursor-pointer hover:text-blue-600 py-3 font-medium hover:bg-zinc-200 transition"
                >
                    <Plus size={16} />
                    New Chat
                </button>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                    Recent Chats
                </p>

                {conversations?.length > 0 ? (
                    <div className="space-y-2">

                        {conversations.map((chat) => (

                            <button
                                key={chat._id}
                                onClick={() => dispatch(setSelectedConversation(chat))}
                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition ${selectedConversation?._id === chat._id
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-[#161b22]"
                                    }`}
                            >
                                <MessageSquare
                                    size={13}
                                    className={`shrink-0 ${selectedConversation?._id === chat._id
                                        ? "text-white"
                                        : "text-zinc-400"
                                        }`}
                                />
                                <p className="truncate text-sm flex">
                                    {chat.title || chat.name || "New Conversation"}
                                </p>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-zinc-500 mt-10">
                        No conversations yet
                    </div>
                )}
                <div className="mx-2.5 h-px bg-white/[0.06] "></div>
            </div>
            <footer>

                <div className="px-3.5 py-3.5 ">
                    {
                        userData ? <div className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150">
                            <div className="relative shrink-0">
                                {userData?.avatar && !imageError ? (
                                    <img
                                        className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
                                        src={userData.avatar}
                                        alt={"User Avatar"}
                                        onError={() => setImageError(true)}
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-[10px] bg-zinc-700 flex items-center justify-center">
                                        <User size={16} className="text-slate-400 " />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[14px] font-semibold text-slate-100 truncate">{userData?.name || "User"}</p>
                                <p className="text-[12px] text-slate-600 mt-px">{"Free Plan"}</p>
                            </div>
                            <div className="flex">
                                <button className="flex items-center justify-center w-7 h-7 rounded-[7px]  border-none bg-transparent text-yellow-600 duration-150 hover:text-slate-400 hover:bg-white/[0.06]"><Coins size={16}></Coins></button>
                                <button className="flex items-center justify-center w-7 h-7 rounded-[7px]  border-none bg-transparent text-slate-600 duration-150 hover:text-slate-400 hover:bg-white/[0.06]"><LogOut size={18}></LogOut></button>
                            </div>
                        </div> : <button onClick={() => {
                            logout();
                            dispatch(setUserData(null))
                        }}>Login</button>
                    }
                </div>
            </footer>
        </aside>
    );



};

export default Sidebar;