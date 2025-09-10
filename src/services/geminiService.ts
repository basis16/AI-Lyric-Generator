
// FIX: Import GoogleGenAI and Type from @google/genai
import { GoogleGenAI, Type } from "@google/genai";
import { SongGenerationParams, SongOutput } from "../types";

// FIX: Initialize GoogleGenAI with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

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
    throw new Error("Failed to generate song details from Gemini. Please check your API key and network connection.");
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
    throw new Error("Failed to generate a random topic from Gemini.");
  }
}