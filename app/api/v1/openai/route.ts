import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        // Retrieve the query from the request body
        const { query } = await req.json();
        if (!query) {
            return NextResponse.json(
                { status: false, message: "Please send query." },
                { status: 400 }
            );
        }

        // Construct the prompt
        const prompt = `Create a form with the following fields: ${query}`;

        // Query OpenAI's API
        const openaiResponse = await openAI.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            temperature: 1,
            messages: [
                {
                    role: "system",
                    content:
                        "You are a resourceful AI assistant capable of generating form structures based on provided specifications. You should present the form structure in JSON format, which includes field labels, input types, and optional validation rules. The form fields should be organized logically from the simplest to the most complex, ensuring to cover all the necessary information required from the user. When possible, include helpful placeholders or descriptions for each field.",
                },
                {
                    role: "user",
                    content: `Create a form structure in JSON format based on the topic: ${query}. The JSON should have a structure like: 
                    {
                        formTitle: "${query}", fields: 
                        [
                            {
                                label          String // form label for the field
                                name           String // unique name for form element name attribute
                                type           FieldType      
                                placeholder    String?
                                required       Boolean        
                                defaultValue   String?
                                helpText       String?
                                minValue       Int?
                                maxValue       Int?
                                minError       String?
                                options         String[] // applicable for SELECT, MULTI_SELECT, INPUT_RADIO
                                maxError       String?
                                regex          String? 
                                regexError     String?
                                regexType      RegexType
                                errorMessage   String?
                                order          Int? // order of the fields
                                imageUrl       String? 
                                validationType ValidationType?
                            }
                        ]
                    },
                    use these 
                    enum FieldType {
                        INPUT_TEXT
                        INPUT_TEXT_AREA
                        INPUT_NUMBER
                        INPUT_CHECKBOX
                        INPUT_RADIO
                        COLOR_PICKER
                        DATE_PICKER
                        TIME_PICKER
                        SELECT
                        MULTI_SELECT
                        FILE_UPLOAD
                        INPUT_PASSWORD
                        INPUT_EMAIL
                        INPUT_URL
                      }

                      enum ValidationType {
                        LENGTH
                        REGEX
                      }
                      
                      enum RegexType {
                        CONTAINS
                        NOT_CONTAINS
                        MATCHES
                        NOT_MATCHES
                      }
                      
                      `,
                },
            ],
            response_format: { type: "json_object" },
        });
        let json = null;
        try {
            json = JSON.parse(openaiResponse?.choices?.[0]?.message?.content || "");
            if (!json) {
                return NextResponse.json(
                    {
                        status: false,
                        message:
                            "An unexpected error occurred while generating roadmap. Please try again.",
                    },
                    { status: 500 }
                );
            }

            return NextResponse.json(
                { status: true, text: json, },
                { status: 200 }
            );
        } catch (e) {
            console.log(e);
            return NextResponse.json(
                {
                    status: false,
                    message:
                        "An unexpected error occurred while generating roadmap. Please try again.",
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('OpenAI API error:', error);
        return NextResponse.json(
            {
                status: false,
                message:
                    "An unexpected error occurred while generating roadmap. Please try again.",
            },
            { status: 400 }
        );
    }
}