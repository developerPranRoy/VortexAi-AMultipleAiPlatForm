import axios from 'axios';
import { graph } from '../graph/graph.js';
import { addMessage } from '../config/memory.js';
import redis from '../../../shared/redis/redis.js';

export const agent = async (req, res) => {

    try {
        const { prompt, conversationId, agent } = req.body
        await redis.del(`messages-${conversationId}`)

        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId, role: "user", content: prompt
        })
        const result = await graph.invoke({
            prompt, conversationId, agent
        })

        const response = result.aiResponse
        await addMessage(conversationId, "user", prompt)
        await addMessage(conversationId, "assistant", response)
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId, role: "assistant", content: response, images: result.images, artifacts: result?.artifacts
        })

        return res.status(200).json({
            answer: result.aiResponse,
            images: result.images,
            artifacts: result.artifacts || [],
            agent: result.agent || "chat"
        })

    } catch (error) {
        console.error("Agent error name:", error.name)
        console.error("Agent error message:", error.message)
        console.error("Agent error stack:", error.stack)
        return res.status(500).json({ message: `Agent error: ${error.message}` })
    }

}
