import { getAiModel } from "../config/llmModel.js"
import { searchTool } from "../config/tavily.js"

export const searchAgent = async (state) => {
    try {
        const result = await searchTool.invoke({
            query: state.prompt
        })
        console.log(result);
        return {
            ...state,
            searchResult: result,
            images: result.images
        }

    } catch (error) {
        console.log(error)
    }
}

