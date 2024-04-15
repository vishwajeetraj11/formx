import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormInput from "@/components/forms/form-input";
import { FormCheckbox } from "@/components/forms/form-checkbox";
import { Field } from "react-final-form";
import Message from "@/components/forms/Message";
import FormDatePicker from "@/components/forms/form-date-picker";
import { FormFilePicker } from "@/components/forms/form-file-picker";
import { FormColorPicker } from "@/components/forms/form-color-picker";

export const renderFields = (field: any) => {
  const defaultProps = {
    placeholder: field.placeholder,
    required: field.required,
  };
  // Factory Pattern
  switch (field.type) {
    case "INPUT_TEXT":
      return <FormInput field={field} />;
    case "INPUT_EMAIL":
      return <FormInput field={field} />;
    case "INPUT_URL":
      return <FormInput field={field} />;
    case "INPUT_PASSWORD":
      return <FormInput field={field} />;
    case "INPUT_CHECKBOX":
      return <FormCheckbox field={field} />;
    case "INPUT_NUMBER":
      return <FormInput field={field} />;
    case "INPUT_TEXT_AREA":
      return (
        <Field name={field.name} validate={(value: string) => {}}>
          {({ input, meta }) => (
            <>
              <Label className="mb-2 block">{field.label}</Label>
              <Textarea
                {...defaultProps}
                value={input.value}
                onChange={input.onChange}
              />
              {field.helpText && <Message meta={meta} field={field} />}
            </>
          )}
        </Field>
      );
    case "INPUT_RADIO":
      return (
        <Field name={field.name} validate={(value: string) => {}}>
          {({ input }) => (
            <>
              <Label className="mb-2 block">{field.label}</Label>
              <RadioGroup value={input.value} onChange={input.onChange}>
                {field.options?.map((option: string, i: number) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          )}
        </Field>
      );
    case "SELECT":
      return (
        <Field name={field.name} validate={(value: string) => {}}>
          {({ input }) => (
            <>
              <Label className="mb-2 block">{field.label}</Label>
              <Select value={input.value} onValueChange={input.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option: string, i: number) => (
                    <SelectItem key={i} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </Field>
      );
    case "DATE_PICKER":
      return (
        <Field name={field.name} validate={(value: string) => {}}>
          {({}) => <FormDatePicker field={field} />}
        </Field>
      );
    case "FILE_UPLOAD":
      return (
        <Field
          name={field.name}
          validate={(value: string) => {}}
          render={() => <FormFilePicker field={field} />}
        ></Field>
      );
    case "COLOR_PICKER":
      return (
        <Field
          name={field.name}
          validate={(value: string) => {}}
          render={() => <FormColorPicker field={field} />}
        ></Field>
      );
    default:
      return <></>;
  }
};
