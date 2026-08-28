import axios from 'axios';
import { graph } from '../graph/graph.js';

export const agent = async (req, res) => {

    try {
        const { prompt, conversationId } = req.body
        console.log("Agent received:", { prompt, conversationId })

        // Step 1: Save user message to chat service
        try {
            await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
                conversationId, role: "user", content: prompt
            })
            console.log("Message saved to chat service")
        } catch (chatErr) {
            console.error("Chat service error:", chatErr.message)
            // Don't block — continue even if save fails
        }

        // Step 2: Run the agent graph
        console.log("Invoking graph...")
        const result = await graph.invoke({
            prompt, conversationId
        })
        console.log("Graph result:", result)

        const response = result.aiResponse
        return res.status(200).json(response)

    } catch (error) {
        console.error("Agent error name:", error.name)
        console.error("Agent error message:", error.message)
        console.error("Agent error stack:", error.stack)
        return res.status(500).json({ message: `Agent error: ${error.message}` })
    }

}
