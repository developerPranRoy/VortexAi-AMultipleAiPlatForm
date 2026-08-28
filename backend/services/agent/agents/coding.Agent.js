import { getAiModel } from "../config/llmModel.js"

export const codingAgent = async (state) => {
    const llm = await getAiModel("coding")
    const systemPrompt = "You are VortexAI, an expert software engineer and coding assistant. Help with programming, debugging, code generation, and software architecture."
    const response = await llm.invoke([
        { role: "system", content: systemPrompt },
        { role: "human", content: state.prompt }
    ])
    return {
        ...state,
        aiResponse: response.content
    }
}
