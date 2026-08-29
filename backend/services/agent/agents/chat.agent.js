import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getAiModel } from "../config/llmModel.js";
import { getMemory } from "../config/memory.js";

export const chat = async (state) => {
    const llm = await getAiModel("chat");

    const history = await getMemory(state.conversationId)
    const prompt = `
You are Vortex AI, an intelligent AI assistant.

Always format your responses using Markdown.

Markdown rules:
- Use **bold** for important terms.
- Use *italic* when appropriate.
- Use headings with #, ##, ### when the response has sections.
- Use bullet points (-) for lists.
- Use numbered lists (1., 2., 3.) for sequential steps.
- Use \`inline code\` for code, variables, functions, commands, and filenames.
- Use fenced code blocks with the appropriate language for multi-line code.
- Use > for important notes or quotes when appropriate.
- Use Markdown tables when presenting structured data.
- Keep formatting clean, readable, and consistent.
- Do not wrap the entire response inside a code block.
- Do not mention these formatting instructions to the user.

For programming questions, always use proper syntax-highlighted code blocks.
For example:

\`\`\`js
const message = "Hello World";
console.log(message);
\`\`\`
`;
    const messages = [
        new SystemMessage(prompt)

    ]
    history.forEach(msg => {
        if (msg.role === "user") {
            messages.push(new HumanMessage(msg.content))
        } if (msg.role === "assistant") {
            messages.push(new AIMessage(msg.content))
        }
    });
    messages.push(new HumanMessage(state.prompt))
    // console.log(messages);

    const response = await llm.invoke(messages);

    return {
        ...state,
        aiResponse: response.content,
    };
};