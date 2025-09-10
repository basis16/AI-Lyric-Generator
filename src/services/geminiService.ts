
// FIX: Import GoogleGenAI and Type from @google/genai
import { GoogleGenAI, Type } from "@google/genai";
import { SongGenerationParams, SongOutput } from "../types";

// FIX: Initialize GoogleGenAI with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * Creates a user-friendly error message based on the caught error object.
 * @param error - The error object caught in the try-catch block.
 * @param context - A string describing the action that failed (e.g., "generate song").
 * @returns A user-friendly error string.
 */
function createApiErrorMessage(error: unknown, context: string): string {
  let userMessage = `Failed to ${context}. An unexpected error occurred.`;
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();
    if (errorMessage.includes("api key")) {
      userMessage = "Authentication failed. Please ensure your API key is valid, active, and correctly configured.";
    } else if (errorMessage.includes("429") || errorMessage.includes("quota")) {
      userMessage = "You have exceeded your request limit for the day. Please try again later.";
    } else if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
      userMessage = "A network error occurred. Please check your internet connection and try again.";
    } else if (errorMessage.includes("candidate was blocked") || errorMessage.includes("safety")) {
      userMessage = "The request was blocked due to the content safety policy. Please modify the topic and try again.";
    } else {
      userMessage = `Failed to ${context}. The AI service encountered an issue. Please try again.`;
    }
  }
  return userMessage;
}


/**
 * Generates song title, lyrics, and prompts for sound and image generation.
 * @param params - The parameters for song generation.
 * @returns A promise that resolves to a SongOutput object.
 */
export async function generateSong(params: SongGenerationParams): Promise<SongOutput> {
  // FIX: Use the recommended model for general text tasks.
  const model = "gemini-2.5-flash";

  const prompt = `Generate a song based on these parameters:
Topic: ${params.topic}
Genre: ${params.genre}
Emotion: ${params.emotion}
Structure: ${params.structure}
Sound Engine Style Hint: ${params.soundEngine}
Image Style Hint: ${params.imageStyle}
Language: ${params.language}

Your output must be a JSON object with the following structure:
- title: A creative song title.
- lyrics: The full song lyrics, with sections like [Verse 1], [Chorus], etc.
- soundPrompt: A detailed prompt for a text-to-sound AI (like Suno AI or Riffusion) to generate the music. Describe the genre, mood, instrumentation, tempo, and vocal style.
- imagePrompt: A detailed prompt for a text-to-image AI to generate cover art. Describe the scene, style, colors, and composition based on the song's topic and emotion. The style should be ${params.imageStyle}.

Do not include any markdown formatting (like \`\`\`json) in your response.`;

  try {
    // FIX: Use ai.models.generateContent with a JSON response schema.
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "The title of the song." },
            lyrics: { type: Type.STRING, description: "The complete lyrics of the song, with structural markers like [Verse] and [Chorus]." },
            soundPrompt: { type: Type.STRING, description: "A detailed prompt for a text-to-sound generation model." },
            imagePrompt: { type: Type.STRING, description: "A detailed prompt for a text-to-image generation model for cover art." },
          },
          required: ["title", "lyrics", "soundPrompt", "imagePrompt"],
        },
      },
    });

    // FIX: Extract text and parse the JSON response.
    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    return result as SongOutput;
  } catch (error) {
    console.error("Error generating song:", error);
    throw new Error(createApiErrorMessage(error, "generate song details"));
  }
}

/**
 * Generates a random song topic.
 * @returns A promise that resolves to a string containing a random topic.
 */
export async function generateRandomTopic(): Promise<string> {
  // FIX: Use the recommended model for general text tasks.
  const model = "gemini-2.5-flash";

  const prompt = `Generate a random, creative, and interesting topic for a song. Provide only the topic as a short phrase or sentence. Do not add any extra text or quotation marks. For example: "A lighthouse keeper's lonely vigil" or "The last message from a dying star".`;

  try {
    // FIX: Use ai.models.generateContent for simple text generation.
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    // FIX: Extract text directly from the response and remove quotes.
    return response.text.trim().replace(/"/g, '');
  } catch (error) {
    console.error("Error generating random topic:", error);
    throw new Error(createApiErrorMessage(error, "generate a random topic"));
  }
}