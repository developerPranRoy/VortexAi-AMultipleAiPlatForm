import { getAiModel } from "../config/llmModel.js"

export const pptAgent = async (state) => {
    const llm = await getAiModel("chat")
    const systemPrompt = "You are VortexAI, a presentation assistant. Help users create PowerPoint presentations, outlines, and slide content. Structure your response as a clear presentation outline with slide titles and bullet points."
    const response = await llm.invoke([
        { role: "system", content: systemPrompt },
        { role: "human", content: state.prompt }
    ])
    return {
        ...state,
        aiResponse: response.content
    }
}
