import { TavilySearch } from "@langchain/tavily";

export const searchTool = new TavilySearch({
  maxResults: 5,
  topic: "general",
  includeImages: true,
  includeAnswer: true, // Enables Tavily to return a generated answer text
});