import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Field } from "react-final-form";
import Message from "./Message";
import { Tables } from "@/types/supabase";

type Props = {
  field: Tables<"form_fields">;
};

const FormInput = ({ field }: Props) => {
  const defaultProps = {
    placeholder: field.placeholder,
    required: field.required,
  };

  let updatedProps = getHTMLAttributesForInputType(field, defaultProps);
  const validationFn = getValidationFn(field);
  return (
    <Field name={field.name} validate={(value) => validationFn(value, field)}>
      {({ input, meta }) => (
        <div>
          <Label className="mb-2 block">{field.label}</Label>
          <Input
            value={input.value}
            onChange={input.onChange}
            {...updatedProps}
          />
          {field.help_text && <Message field={field} meta={meta} />}
        </div>
      )}
    </Field>
  );
};

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

export const validationFns = {
  email: (value: string, field: Tables<"form_fields">): string => {
    if (!value && field.required) return "Email is required";
    if (!EMAIL_REGEX.test(value)) return "Email is invalid";
    return "";
  },
  url: (value: string, field: Tables<"form_fields">): string => {
    try {
      if (field.required) {
        if (!value) return "Url is required";
      }
      new URL(value);
      return "Not a valid url";
    } catch (e) {
      return "";
    }
  },
  text: (value: string, field: Tables<"form_fields">): string => "",
  number: (value: string, field: Tables<"form_fields">): string => "",
  password: (value: string, field: Tables<"form_fields">): string => "",
};

export const getValidationFn = (field: Tables<"form_fields">) => {
  switch (field.field_type) {
    case "INPUT_TEXT":
      return validationFns.text;
    case "INPUT_NUMBER":
      return validationFns.number;
    case "INPUT_PASSWORD":
      return validationFns.password;
    case "INPUT_EMAIL":
      return validationFns.email;
    case "INPUT_URL":
      return validationFns.url;
    default:
      return validationFns.text;
  }
};

export const getHTMLAttributesForInputType = (
  field: Tables<"form_fields">,
  defaultProps: Record<string, unknown>
) => {
  const baseAttributes = {
    ...defaultProps,
  };

  switch (field.field_type) {
    case "INPUT_TEXT":
      return { ...baseAttributes, type: "text" };
    case "INPUT_NUMBER":
      return {
        ...baseAttributes,
        type: "number",
        min: field.min_value,
        max: field.max_value,
      };
    case "COLOR_PICKER":
      return { ...baseAttributes, type: "color" };
    case "INPUT_PASSWORD":
      return { ...baseAttributes, type: "password" };
    case "INPUT_EMAIL":
      return { ...baseAttributes, type: "email" };
    case "INPUT_URL":
      return { ...baseAttributes, type: "url" };
    default:
      return baseAttributes;
  }
};

export default FormInput;
