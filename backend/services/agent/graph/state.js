import { Annotation } from "@langchain/langgraph";

export const agentState = Annotation.Root({
    prompt: Annotation(),
    aiResponse: Annotation(),
    agent: Annotation(),
    conversationId: Annotation(),
    searchResult: Annotation(),
    images: Annotation(),
    artifacts: Annotation(),
    // File upload fields
    fileUrl: Annotation(),      // Cloudinary secure_url
    filePublicId: Annotation(), // Cloudinary public_id
    fileType: Annotation(),     // "image" | "pdf" | "ppt"
    fileMime: Annotation(),     // original MIME type
});
