import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";
import redis from "../../../shared/redis/redis.js";
import { uploadToCloudinary } from "../utils/uploadCloudinary.js";

/**
 * Resolve the Cloudinary resource_type and our internal fileType from a MIME type
 */
const resolveFileType = (mimetype) => {
    if (mimetype.startsWith("image/")) {
        return { cloudinaryResourceType: "image", fileType: "image" };
    }
    if (mimetype === "application/pdf") {
        return { cloudinaryResourceType: "raw", fileType: "pdf" };
    }
    // PowerPoint (.ppt / .pptx)
    return { cloudinaryResourceType: "raw", fileType: "ppt" };
};

export const agent = async (req, res) => {
    try {
        const { prompt, conversationId, agent: agentName } = req.body;

        // --- Handle optional file upload ---
        let fileUrl = null;
        let filePublicId = null;
        let fileType = null;
        let fileMime = null;

        if (req.file) {
            const { cloudinaryResourceType, fileType: ft } = resolveFileType(req.file.mimetype);
            const uploaded = await uploadToCloudinary(
                req.file.buffer,
                cloudinaryResourceType,
                `vortexai/${ft}`
            );
            fileUrl = uploaded.secure_url;
            filePublicId = uploaded.public_id;
            fileType = ft;
            fileMime = req.file.mimetype;
        }

        // Clear any cached messages for this conversation
        await redis.del(`messages-${conversationId}`);

        // Persist the user message
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId,
            role: "user",
            content: prompt,
        });

        // Run the graph
        const result = await graph.invoke({
            prompt,
            conversationId,
            agent: agentName,
            fileUrl,
            filePublicId,
            fileType,
            fileMime,
        });

        const response = result.aiResponse;

        // Persist the assistant reply
        await addMessage(conversationId, "user", prompt);
        await addMessage(conversationId, "assistant", response);
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId,
            role: "assistant",
            content: response,
            images: result.images,
            artifacts: result?.artifacts,
        });

        return res.status(200).json({
            answer: result.aiResponse,
            images: result.images,
            artifacts: result.artifacts || [],
            agent: result.agent || "chat",
        });
    } catch (error) {
        console.error("Agent error name:", error.name);
        console.error("Agent error message:", error.message);
        console.error("Agent error stack:", error.stack);
        return res.status(500).json({ message: `Agent error: ${error.message}` });
    }
};
