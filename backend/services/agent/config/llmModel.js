import "dotenv/config";
import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatOpenRouter } from "@langchain/openrouter"


const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0,
    maxRetries: 2,

})

const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0,
    maxRetries: 2,
})

const openRouter = new ChatOpenRouter({
    model: "deepseek/deepseek-chat",
    temperature: 0,
    maxTokens:2500,
    apiKey:process.env.OPENROUTER_API_KEY
})


export const getAiModel = async (agent) => {
    switch (agent) {
        case "chat": return groq;
        case "search": return groq;
        case "coding": return openRouter;
        // case "search": return grok;
        // case "search": return grok;
        // case "search": return grok;
        default: return groq
    }
}