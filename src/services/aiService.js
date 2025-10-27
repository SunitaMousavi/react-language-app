import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDY0RCH83sbIXMRJ9NquIQ1Z0mXVCjSM-g");

export class AIService {
  constructor() {
    this.model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });
    this.chat = null;
  }

  async startNewChat() {
    this.chat = this.model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "You are a helpful French language tutor. You help students learn French by explaining concepts, providing examples, and engaging in conversational practice. Always respond in a friendly, encouraging manner. For French responses, provide translations and explanations when appropriate.",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Bonjour ! I'm your French tutor AI. I'm here to help you learn French through conversation, explanations, and practice. Whether you want to practice speaking, learn grammar, or improve your vocabulary, I'm here to assist you. How can I help you with your French learning today?",
            },
          ],
        },
      ],
    });
    return "Bonjour ! I'm your French tutor AI. I'm here to help you learn French through conversation, explanations, and practice. Whether you want to practice speaking, learn grammar, or improve your vocabulary, I'm here to assist you. How can I help you with your French learning today?";
  }

  async sendMessage(message) {
    if (!this.chat) {
      await this.startNewChat();
    }

    try {
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error sending message to AI:", error);
      throw new Error("Failed to get response from AI. Please try again.");
    }
  }
}

export const aiService = new AIService();
