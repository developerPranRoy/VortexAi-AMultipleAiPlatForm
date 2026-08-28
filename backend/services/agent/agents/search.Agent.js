import { getAiModel } from "../config/llmModel.js"

export const searchAgent = async (state) => {
    // TODO: implement real web search logic
    // For now, passes state through to the chat agent (graph routes search -> chat)
    return { ...state }
}
