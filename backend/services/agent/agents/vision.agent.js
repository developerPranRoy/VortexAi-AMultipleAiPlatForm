import { getAiModel } from "../config/llmModel.js"

export const imageGenAgent = async (state) => {
    const llm = await getAiModel("chat")
    const systemPrompt = "You are VortexAI, a vision and image assistant. Help users with image analysis, generation prompts, and visual design descriptions."
    const response = await llm.invoke([
        { role: "system", content: systemPrompt },
        { role: "human", content: state.prompt }
    ])
    return {
        ...state,
        aiResponse: response.content
    }
}
