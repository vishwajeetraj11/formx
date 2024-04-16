"use server";

import OpenAI from "openai";
import { getPrompt } from "@/lib/data/prompt";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/types/supabase";

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
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
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
          content: getPrompt(query),
        },
      ],

      response_format: { type: "json_object" },
    });

    let json: any = null;

    try {
      json = JSON.parse(openaiResponse?.choices?.[0]?.message?.content || "");

      const { data, error } = await supabase
        .from("forms")
        .insert([
          {
            title: json?.formTitle || " ",
            author_id: user?.id,
          },
        ])
        .select("*");

      if (error) {
        console.log(error);
        // thro/w Error('rror inserting form')
      }
      if (!data) return;
      const formId = data?.[0].id;
      const _fields = json.fields.map((field: Tables<"form_fields">, index: number) => ({
        ...field,
        form_id: formId,
        field_order: index+1,
        form_title: json?.formTitle,
      }));
      const { data: fieldsData, error: fieldsError } = await supabase
        .from("form_fields")
        .insert(_fields)

      if (!json) {
        return {
          status: false,
          message:
            "An unexpected error occurred while generating roadmap. Please try again.",
        };
      }

      return { status: true, text: json, formId };
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
