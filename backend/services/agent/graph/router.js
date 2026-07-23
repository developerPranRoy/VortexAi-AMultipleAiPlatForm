import { getAiModel } from "../config/llmModel.js"


export const router = async (state) => {

    const llm = await getAiModel("router")
    const prompt = `
You are an AI Router for a multi-agent system.

Your task is to analyze the user's request and decide which agent should handle it.

Available agents:

1. chat
- General conversation
- Greetings
- Explanations
- Advice
- Casual questions
- Brainstorming

2. search
- Needs recent information
- Current events
- Internet search
- News
- Live data
- Latest prices
- Sports scores
- Weather
- Facts that may have changed over time

3. coding
- Programming
- Debugging
- Code generation
- Code explanation
- APIs
- React
- Node.js
- JavaScript
- Python
- TypeScript
- SQL
- Software engineering

4. pdf
- Read PDF
- Summarize PDF
- Extract information from PDF
- Answer questions from uploaded PDF

5. ppt
- Create PowerPoint
- Generate presentation
- Slides
- PPTX
- Presentation outline

6. vision
- Generate images
- Create illustrations
- Draw
- Design logos
- Edit images
- Analyze uploaded images

Rules:
- Return ONLY one of these values:
chat
search
coding
pdf
ppt
vision

- Do NOT explain your answer.
- Do NOT return JSON.
- Do NOT use markdown.
- Output only the agent name.

User Request:
${state.prompt.at(-1).content}
`;

    const respose = await llm.invoke(prompt)
    console.log(respose);
    return {
        ...state,
        agent: respose.content
            .trim()
            .tolowerCase()
    }
}