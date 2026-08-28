import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const models = await groq.models.list();
console.log("\n✅ Available models on your Groq account:\n");
models.data
    .sort((a, b) => a.id.localeCompare(b.id))
    .forEach(m => console.log(" -", m.id));
