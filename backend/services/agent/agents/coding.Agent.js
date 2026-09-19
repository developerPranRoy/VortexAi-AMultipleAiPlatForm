import { getAiModel } from "../config/llmModel.js";

export const codingAgent = async (state) => {
    try {
        const llm = await getAiModel("coding");
        const intentLlm = await getAiModel("intent");
        const intentRes = await intentLlm.invoke(`
            You are an intent classifier.
            Return Only one of htese valuse.
            CODE_GENERATION, CODE_REVIEW, DEBUGGING, OPTIMIZATION, DOCUMENTATION, ARCHITECTURE_DESIGN, TESTING, OTHER
            User Request: ${state.prompt}
            
            `)
        const intent = intentRes.content.trim().toUpperCase().split(/\s+/)[0];
        if (!intent) {
            throw new Error("Unable to determine intent from user prompt.");
        }
        if (intent.includes("CODE_GENERATION")) {
            const prompt = ` You are VortexAi agent. 
            Generate the requested project.
            Default stact:HTMl, CSS, JS, React, Nodejs, Express, MongoDB
            USE react /nextjs /tailwindcss /typescript /mongodb /express /nodejs
            Rules: 
            -Responsive
            Modern UI
            -Clean Code
            -Scalable
            -Secure
            -Flexbox/Grid
            -Use best practices
            -Use latest versions of libraries and frameworks
            -SMOOTH SCROLLING
            -HOVER EFFECTS
            -ANIMATIONS
            -SEO OPTIMIZATION
            -BEAUTIFUL DESIGN
            -USE COMPONENTS
            -USE REUSABLE CODE
            -sINGLE page unlsess user asks for multi page
            -USE API ROUTES
            -USE ENV VARIABLES
            -USE .GITIGNORE
            -USE .ENV FILE
            -USE .ESLINT FILE
            Return only valid json.
            Schema:
            {
            "files": [
                {
                    "name": "index.html",
                    "content": "..."
                },
                {
                    "name": "style.css",
                    "content": "..." },
                {
                    "name": "script.js",
                    "content": "..."
                }
            ]
        }
            Rules:
            -Output must be a valid JSON object.
            --Do not include any additional text, explanations, or comments outside of the JSON structure.
            -no markdown formatting, no code fences, no backticks, no quotes around the entire JSON.
            -Ensure that the JSON is properly formatted and can be parsed without errors.
            -The JSON should strictly adhere to the specified schema, with the "files" array containing objects that have "name" and "content" properties.  
            -never mention intent or prompt in the output.
            User Request: ${state.prompt}

            `
            const res = await llm.invoke(prompt)

            // strip markdown code fences the LLM may wrap around the JSON
            const raw = res.content
                .trim()
                .replace(/^```(?:json)?\s*/i, "")
                .replace(/\s*```$/, "")
                .trim()

            const data = JSON.parse(raw)
            return {
                ...state,
                aiResponse: "Code Geneterated Successfully",
                artifacts: [
                    {
                        id: Date.now(),
                        type: "Project",
                        files: data.files || [],
                        title: state.prompt || "Untitled Project"
                    }
                ]
            }
        }

        const res = await llm.invoke(`
            The User Request is:
            ${intent}
            Retun Markdown only.
            Never generate project files.
            user  heading like:
            #Overview
            #Code Review
            #Debugging
            ##Explanation
            ##Problem
            ##Solution
            #Optimization
            ##improvements
            ##Best Practices
            #Documentation
            ##Summary
            User Request: ${state.prompt}
            
            `)

        const data = res.content
        return {
            ...state,
            aiResponse: data,
            artifacts: []
        }


    } catch (error) {
        console.error("Error in codingAgent:", error);
        throw error;
    }
};