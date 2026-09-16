import api from "../utils/axios";

async function saveMessage(payload) {
    try {
        const { data } = await api.post(
            "/api/chat/save-message",
            payload
        );

        console.log("Message saved:", data);

        return data;
    } catch (error) {
        console.error("Error saving message:", error);
        return null;
    }
}

export default saveMessage;