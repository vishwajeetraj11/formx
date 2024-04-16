"use client";
import { Button } from "@/components/ui/button";
import { renderFields } from "@/lib/form";
import { Fragment } from "react";
import { Form } from "react-final-form";
import React from "react";
import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";

type Props = {
  form_fields: Tables<"form_fields">[];
};

const supabase = createClient();

const ViewForm = ({ form_fields }: Props) => {
  const onSubmit = async (values: Record<string, any>) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.id) {
      return;
    }
    const formId = form_fields?.[0].form_id;
    const _fields = form_fields.map(
      (field: Tables<"form_fields">, index: number) => ({
        form_id: formId,
        field_id: field.id,
        user_id: user?.id,
        response: [values[field.name]],
      })
    );
    const { data: responseData, error: responseError } = await supabase
      .from("responses")
      .insert(_fields);
  };

  return (
    <div className="w-[600px]">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => {
          return (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 px-10 mt-10"
            >
              {form_fields
                .sort(
                  (field1, field2) => field1.field_order - field2.field_order
                )
                .map((field) => (
                  <Fragment key={field.name}>{renderFields(field)}</Fragment>
                ))}

              <Button type="submit">Submit</Button>
            </form>
          );
        }}
      />
    </div>
  );
};

export default ViewForm;
