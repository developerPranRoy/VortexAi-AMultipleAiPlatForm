import { getAiModel } from "../config/llmModel.js";

export const pptAgent = async (state) => {
    const llm = await getAiModel("chat");

    const systemPrompt =
        "You are VortexAI, a presentation assistant. " +
        "Help users create PowerPoint presentations, outlines, and slide content. " +
        "Structure your response as a clear presentation outline with slide titles and bullet points. " +
        "If the user has uploaded an existing presentation, analyze or summarize its content as instructed.";

    let humanContent = state.prompt;

    if (state.fileUrl && state.fileType === "ppt") {
        // The file is stored on Cloudinary as a raw asset; provide context to the LLM
        humanContent =
            `The user has uploaded a PowerPoint file (available at: ${state.fileUrl}). ` +
            `Their request: ${state.prompt || "Please analyze or summarize this presentation."}`;
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
