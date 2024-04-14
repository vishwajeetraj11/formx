"use server";

import OpenAI from "openai";
import { prompt } from "@/lib/data/prompt";

export const generateForm = async (query: string, provider: Model) => {
  const model =
    provider === "groq" ? "mixtral-8x7b-32768" : "gpt-3.5-turbo-1106";

  if (
    (provider === "groq" && !process.env.GROQ_API_KEY) ||
    (provider === "openai" && !process.env.OPENAI_API_KEY)
  ) {
    return {
      status: false,
      message: `Please set ${provider.toUpperCase()}_API_KEY in your .env file.`,
    };
  }

  const apiKey =
    provider === "groq" ? process.env.GROQ_API_KEY : process.env.OPENAI_API_KEY;

  const baseURL =
    provider === "groq"
      ? "https://api.groq.com/openai/v1"
      : "https://api.openai.com/v1";

  const openAI = new OpenAI({
    apiKey,
    baseURL,
  });

  try {
    if (!query)
      return {
        status: false,
        message: "Please send query.",
      };

    // Query OpenAI's API
    const openaiResponse = await openAI.chat.completions.create({
      model,
      temperature: 1,
      messages: [
        {
          role: "system",
          content:
            "You are a resourceful AI assistant capable of generating form structures based on provided specifications. You should present the form structure in JSON format, which includes field labels, input types, and optional validation rules. The form fields should be organized logically from the simplest to the most complex, ensuring to cover all the necessary information required from the user. When possible, include helpful placeholders or descriptions for each field.",
        },
        {
          role: "user",
          content: prompt(query),
        },
      ],

      response_format: { type: "json_object" },
    });

    let json = null;

    try {
      json = JSON.parse(openaiResponse?.choices?.[0]?.message?.content || "");

      if (!json) {
        return {
          status: false,
          message:
            "An unexpected error occurred while generating roadmap. Please try again.",
        };
      }

      return { status: true, text: json };
    } catch (e) {
      console.log(e);

      return {
        status: false,
        message:
          "An unexpected error occurred while generating roadmap. Please try again.",
      };
    }
  } catch (error) {
    console.error("OpenAI API error:", error);

    return {
      status: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
