"use server";
import ViewForm from "@/components/forms/view-form";
import { createClient } from "@/utils/supabase/client";
import React from "react";

interface Props {
  params: { id: string };
}

const View = async (props: Props) => {
  const id = props.params.id;
  const supabaseClient = createClient();
  const query = `
  *,
  form_fields (
    *
  )
`;
  const { data } = await supabaseClient
    .from("forms")
    .select(query)
    .eq("id", id);

  return (
    <div>
      <ViewForm form_fields={data?.[0]?.form_fields || []} />
    </div>
  );
};

export default View;
