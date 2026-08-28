import { getAiModel } from "../config/llmModel.js"

export const pdfAgent = async (state) => {
    const llm = await getAiModel("chat")
    const systemPrompt = "You are VortexAI, a PDF analysis assistant. Help users read, summarize, and extract information from PDF documents."
    const response = await llm.invoke([
        { role: "system", content: systemPrompt },
        { role: "human", content: state.prompt }
    ])
    return {
        ...state,
        aiResponse: response.content
    }
}
