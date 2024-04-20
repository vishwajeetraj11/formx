"use client";
import { Button } from "@/components/ui/button";

import { Form } from "react-final-form";
import { RenderFields } from "./render-fields";
import { Tables } from "@/types/supabase";

interface FormProps {
  formFields: Tables<"form_fields">[];
}

export default function FormGenerator({ formFields }: FormProps) {
  const onSubmit = async (values: Record<string, any>) => {
    // console.log(values);
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-[600px] px-10"
          >
            <RenderFields
              fields={formFields}
              key={JSON.stringify(formFields)}
            />
            <Button type="submit">Submit</Button>
          </form>
        )}
      />
    </>
  );
}
