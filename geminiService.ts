
import { GoogleGenAI, Type } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY}); exclusively.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async generateAltText(imageUrl: string): Promise<string> {
    try {
      // Use ai.models.generateContent with specified model and part structure.
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { text: "Describe this photograph in one elegant sentence for accessibility. Focus on the mood and subjects." },
            { inlineData: { mimeType: "image/jpeg", data: await this.urlToBase64(imageUrl) } }
          ]
        },
      });
      // Access response.text property directly.
      return response.text || "A beautiful photograph.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "A stunning photography piece.";
    }
  },

  async suggestTags(imageUrl: string): Promise<string[]> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { text: "Suggest 5 relevant tags for this photograph in JSON format." },
            { inlineData: { mimeType: "image/jpeg", data: await this.urlToBase64(imageUrl) } }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            propertyOrdering: ["tags"],
          }
        }
      });
      // Extract and trim text before parsing JSON.
      const jsonStr = response.text?.trim();
      if (!jsonStr) return ["Photography", "Visuals"];
      const data = JSON.parse(jsonStr);
      return data.tags || [];
    } catch (error) {
      console.error("Gemini Error:", error);
      return ["Photography", "Visuals"];
    }
  },

  async urlToBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
};
