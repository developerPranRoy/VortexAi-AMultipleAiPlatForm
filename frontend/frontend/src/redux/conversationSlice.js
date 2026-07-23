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
    }

})

export const { setConversation, addConversation, setSelectedConversation } = conversationSlice.actions
export default conversationSlice.reducer