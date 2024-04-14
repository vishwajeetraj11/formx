import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Field } from "react-final-form";
import Message from "./Message";

type Props = {
  field: any;
};

const FormInput = ({ field }: Props) => {
  const defaultProps = {
    placeholder: field.placeholder,
    required: field.required,
  };

  let updatedProps = getHTMLAttributesForInputType(field, defaultProps);

  return (
    <Field name={field.name} validate={getValidationFn(field.type)}>
      {({ input, meta }) => (
        <div>
          <Label className="mb-2 block">{field.label}</Label>
          <Input
            value={input.value}
            onChange={input.onChange}
            {...updatedProps}
          />
          {field.helpText && <Message field={field} meta={meta} />}
        </div>
      )}
    </Field>
  );
};

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

export const validationFns = {
  email: (value: string, field: any) => {
    if (!value && field.required) return "Email is required";
    if (!EMAIL_REGEX.test(value)) return "Email is invalid";
    return "";
  },
  url: (value: string, field: any) => {
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
};

export const getValidationFn = (fieldType: string) => {
  switch (fieldType) {
    case "INPUT_TEXT":
      return () => {};
    case "INPUT_NUMBER":
      return () => {};
    case "INPUT_PASSWORD":
      return () => {};
    case "INPUT_EMAIL":
      return validationFns.email;
    case "INPUT_URL":
      return validationFns.url;
    default:
      return () => {};
  }
};

export const getHTMLAttributesForInputType = (
  field: any,
  defaultProps: Record<string, string>
) => {
  const baseAttributes = {
    ...defaultProps,
  };

  switch (field.type) {
    case "INPUT_TEXT":
      return { ...baseAttributes, type: "text" };
    case "INPUT_NUMBER":
      return {
        ...baseAttributes,
        type: "number",
        min: field.min,
        max: field.max,
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
