"use client";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Form } from "react-final-form";
import { RenderFields } from "./render-fields";

export default function FormGenerator() {
  const [formFields, setFormFields] = useState<any>({
    formTitle: "Tech Fest Registration",
    fields: [
      {
        label: "Text Input",
        name: "text_input",
        type: "INPUT_TEXT",
        placeholder: "Enter your text",
        required: true,
        defaultValue: "",
        helpText: "Please enter your text here",
        validationType: "LENGTH",
        minValue: 1,
        maxValue: 100,
        minError: "Text must be at least 1 character long",
        maxError: "Text cannot exceed 100 characters",
        order: 1,
      },
      {
        label: "Text Area",
        name: "text_area",
        type: "INPUT_TEXT_AREA",
        placeholder: "Enter your paragraph",
        required: false,
        defaultValue: "",
        helpText: "Feel free to write a longer message here",
        order: 2,
      },
      {
        label: "Number Input",
        name: "number_input",
        type: "INPUT_NUMBER",
        placeholder: "Enter a number",
        required: true,
        defaultValue: "",
        minValue: 0,
        maxValue: 1000,
        minError: "Number must be 0 or greater",
        maxError: "Number cannot exceed 1000",
        order: 3,
      },
      {
        label: "Checkbox",
        name: "checkbox_input",
        type: "INPUT_CHECKBOX",
        required: false,
        defaultValue: false,
        helpText: "Check this box if needed",
        order: 4,
      },
      {
        label: "Radio Buttons",
        name: "radio_input",
        type: "INPUT_RADIO",
        options: ["Option 1", "Option 2", "Option 3"],
        required: true,
        defaultValue: "Option 1",
        helpText: "Select one of the options",
        order: 5,
      },
      {
        label: "Color Picker",
        name: "color_picker",
        type: "COLOR_PICKER",
        required: false,
        defaultValue: "#ffffff",
        helpText: "Choose a color",
        order: 6,
      },
      {
        label: "Date Picker",
        name: "date_picker",
        type: "DATE_PICKER",
        required: true,
        defaultValue: "",
        helpText: "Select a date",
        order: 7,
      },
      {
        label: "Time Picker",
        name: "time_picker",
        type: "TIME_PICKER",
        required: true,
        defaultValue: "",
        helpText: "Select a time",
        order: 8,
      },
      {
        label: "Select Dropdown",
        name: "select_dropdown",
        type: "SELECT",
        options: ["Option A", "Option B", "Option C"],
        required: true,
        defaultValue: "Option A",
        helpText: "Choose an option from the dropdown",
        order: 9,
      },
      {
        label: "Multi-select Dropdown",
        name: "multi_select_dropdown",
        type: "MULTI_SELECT",
        options: ["Option X", "Option Y", "Option Z"],
        required: true,
        defaultValue: ["Option X"],
        helpText: "Select multiple options from the dropdown",
        order: 10,
      },
      {
        label: "File Upload",
        name: "file_upload",
        type: "FILE_UPLOAD",
        required: true,
        helpText: "Upload a file",
        order: 11,
      },
      {
        label: "Password",
        name: "password_input",
        type: "INPUT_PASSWORD",
        placeholder: "Enter your password",
        required: true,
        helpText: "Please enter your password here",
        validationType: "LENGTH",
        minValue: 6,
        maxValue: 20,
        minError: "Password must be at least 6 characters long",
        maxError: "Password cannot exceed 20 characters",
        order: 12,
      },
      {
        label: "Email",
        name: "email_input",
        type: "INPUT_EMAIL",
        placeholder: "Enter your email",
        required: true,
        helpText: "Please enter your email address here",
        validationType: "REGEX",
        regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        regexError: "Please enter a valid email address",
        order: 13,
      },
      {
        label: "URL",
        name: "url_input",
        type: "INPUT_URL",
        placeholder: "Enter a URL",
        required: false,
        helpText: "Please enter a URL here",
        order: 14,
      },
    ],
  });

  const onGetFields = async () => {
    try {
      const inputValue =
        (document.getElementById("query") as HTMLInputElement)?.value || "";

      const { data } = await axios({
        method: "POST",
        url: "/api/v1/openai",
        data: {
          query: inputValue,
        },
      });
      setFormFields(data.text);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      } else {
      }
    }
  };

  const onSubmit = async (values: Record<string, any>) => {
    console.log(values);
  };

  return (
    <>
      <Input id="query" />
      <Button onClick={onGetFields}>Get Fields</Button>
      <Form
        // initialValues={{}}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 px-10 mt-10"
          >
            <RenderFields
              fields={formFields.fields}
              key={JSON.stringify(formFields)}
            />
            <Button type="submit">Submit</Button>
          </form>
        )}
      />
    </>
  );
}
