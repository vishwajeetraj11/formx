"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Tables } from "@/types/supabase";
import { Field } from "react-final-form";

interface Props {
  field: Tables<"form_fields">;
}

export function FormCheckbox({ field }: Props) {
  return (
    <Field name={field.name} validate={(value: string) => {}}>
      {({ input }) => (
        <>
          <div className="items-top flex space-x-2">
            <Checkbox id="terms1" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
              <p className="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
          {field.help_text && (
            <p className="text-gray-600 text-xs mt-2">{field.help_text}</p>
          )}
        </>
      )}
    </Field>
  );
}
