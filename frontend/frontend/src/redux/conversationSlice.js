import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: "conversation",
    initialState: {
        conversation: [],
        selectedConversation: null
    },
    reducers: {
        setConversation: (state, action) => {
            state.conversation = action.payload

        },
        addConversation: (state, action) => {
            state.conversation.unshift(action.payload)
        },
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload
        },
        setConvTilte: (state, action) => {
            const { title, conversationId } = action.payload;

            state.conversation = state.conversation.map((conv) =>
                conv._id === conversationId
                    ? { ...conv, title }
                    : conv
            );

            if (state.selectedConversation?._id === conversationId) {
                state.selectedConversation = {
                    ...state.selectedConversation,
                    title,
                };
            }
        }
    }

})

export const { setConversation, addConversation, setSelectedConversation, setConvTilte } = conversationSlice.actions
export default conversationSlice.reducer