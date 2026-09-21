import axios from "axios";
import { getAiModel } from "../config/llmModel.js";
import { uploadToCloudinary } from "../utils/uploadCloudinary.js";

export const imageGenAgent = async (state) => {
    try {
        // --- If the user uploaded an image, analyze it instead of generating ---
        if (state.fileUrl && state.fileType === "image") {
            const llm = await getAiModel("chat");
            const response = await llm.invoke([
                {
                    role: "system",
                    content:
                        "You are VortexAI, a vision assistant. Analyze the provided image in detail: describe what you see, identify objects, text, colors, and context.",
                },
                {
                    role: "human",
                    content: [
                        { type: "image_url", image_url: { url: state.fileUrl } },
                        { type: "text", text: state.prompt || "Please analyze this image." },
                    ],
                },
            ]);
            return { ...state, aiResponse: response.content };
        }

        // --- Otherwise generate an image from the prompt ---
        const llm = await getAiModel("image");

        // Step 1: Enhance the prompt
        const res = await llm.invoke(`
You are an elite AI Image Prompt Engineer.

Your sole task is to transform the user's input into a highly detailed, visually compelling, cinematic image generation prompt optimized for models like Midjourney, Stable Diffusion, and FLUX.

Guidelines:
1. Subject Details: Describe the main subject(s) with high specificity (apparel, expression, textures, posture).
2. Environment & Setting: Define atmosphere, background, architecture, or landscape clearly.
3. Lighting & Color: Specify lighting types and color palettes.
4. Cinematics & Optics: Detail camera angles, lens specs, depth of field, framing.
5. Artistic Style: Use concrete terms (photo-realistic, hyper-detailed, cinematic film still, octane render).

Return ONLY the enhanced prompt text — no JSON, no explanation, just the prompt string.

User Request: ${state.prompt}
`);

        const enhancedPrompt = res.content.trim();

        // Step 2: Generate image via Pollinations
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}`;
        const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
        const buffer = Buffer.from(imageResponse.data);

        // Step 3: Upload to Cloudinary — correct arg order: (buffer, resourceType, folder)
        const uploaded = await uploadToCloudinary(buffer, "image", "vortexai/generated");

        // secure_url is permanent — use it directly
        const finalUrl = uploaded.secure_url;

        return {
            ...state,
            aiResponse: `### Image Generated Successfully\n\n![Generated Image](${finalUrl})\n\n[Open full size](${finalUrl})`,
            images: [finalUrl],
        };
    } catch (error) {
        console.error("Vision agent error:", error.message);
        return {
            ...state,
            aiResponse: "Failed to generate image. Please try again.",
        };
    }
};
