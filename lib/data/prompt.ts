export const prompt = (query: string) => {
  return `Create a form structure in JSON format based on the topic: ${query}. The JSON should have a structure like: 
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
                      `;
};
