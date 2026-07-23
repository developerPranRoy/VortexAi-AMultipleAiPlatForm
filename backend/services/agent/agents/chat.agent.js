import { getAiModel } from "../config/llmModel.js"


export const chat = async (state) => {

    const llm = await getAiModel("chat")
    const prompt = "You are vortex Ai ,an intelligent AI assistant"
    const response = await llm.invoke([
        {
            "role": "system",
            "content": prompt
        }, {
            "role": "human",
            "content": state.prompt
        }
    ])

    return {
        ...state,
        aiResponse: response.content
    }


}