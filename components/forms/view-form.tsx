"use client";
import { Button } from "@/components/ui/button";
import { renderFields } from "@/lib/form";
import { Fragment } from "react";
import { Form } from "react-final-form";
import React from "react";
import { Tables } from "@/types/supabase";

type Props = {
  form_fields: Tables<"form_fields">[];
};

const ViewForm = ({ form_fields }: Props) => {
  const onSubmit = async (values: Record<string, any>) => {
    console.log(values);
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
