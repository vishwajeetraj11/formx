export const getPrompt = (query: string) => {
  return `Create a form structure in JSON format based on the topic: ${query}. 
          Also provide a valid form title as per user provided topic.
          The JSON should have a structure like: 
                    {
                        formTitle: String,
                        fields: [
                                  {
                                      label           String // form label for the field
                                      name            String // unique name for form element name attribute
                                      field_type      FieldType      
                                      placeholder     String?
                                      required        Boolean        
                                      default_value   String?
                                      help_text       String?
                                      min_value       Int?
                                      max_value       Int?
                                      min_error       String?
                                      options         String[] // applicable for SELECT, MULTI_SELECT, INPUT_RADIO
                                      max_error       String?
                                      regex           String? 
                                      regex_error     String?
                                      regex_type      RegexType
                                      error_message   String?
                                      field_order     Int? // order of the fields
                                      image_url       String? 
                                      validation_type ValidationType?
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
                        SELECT
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
                      `;
};
