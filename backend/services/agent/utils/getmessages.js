import axios from 'axios';

export const getMessages = async (conversationId) => {
    try {
        const data = await axios.get(`${process.env.CHAT_SERVICE}/get-message/${conversationId}`, {
            conversationId, role: "user", content: prompt
        })
        return data

    } catch (error) {
        console.log(error);
        return null

    }
}