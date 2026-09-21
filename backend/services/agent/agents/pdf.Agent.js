import axios from "axios";
import { getAiModel } from "../config/llmModel.js";

/**
 * Fetches a PDF from Cloudinary via its secure_url and returns the raw buffer
 */
const fetchPdfBuffer = async (url) => {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return Buffer.from(response.data);
};

export const pdfAgent = async (state) => {
    const llm = await getAiModel("chat");

    const systemPrompt =
        "You are VortexAI, a PDF analysis assistant. " +
        "When PDF content is provided, carefully read, summarize, and answer questions about it. " +
        "When no PDF is available, help the user understand or structure PDF-related tasks.";

    let humanContent = state.prompt;

    if (state.fileUrl && state.fileType === "pdf") {
        try {
            // Fetch PDF bytes and encode as base64 for the LLM
            const pdfBuffer = await fetchPdfBuffer(state.fileUrl);
            const base64Pdf = pdfBuffer.toString("base64");

            // Pass PDF as a base64 data URI so the model can process it
            humanContent = [
                {
                    type: "text",
                    text: state.prompt || "Please summarize and analyze this PDF document.",
                },
                {
                    type: "image_url",
                    image_url: {
                        url: `data:application/pdf;base64,${base64Pdf}`,
                    },
                },
            ];
        } catch (err) {
            // Fall back to providing just the URL as context
            humanContent =
                `The user has uploaded a PDF (available at: ${state.fileUrl}). ` +
                `Their request: ${state.prompt}`;
        }
    }

    const response = await llm.invoke([
        { role: "system", content: systemPrompt },
        { role: "human", content: humanContent },
    ]);

    return {
        ...state,
        aiResponse: response.content,
    };
};
