"use server";
import FormDetails from "@/components/common/form-details";
import FormFooter from "@/components/common/form-footer";
import FormNav from "@/components/common/form-nav";
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
    .eq("id", id)
    .single();

  return (
    <>
      <FormNav />
      <div className="max-w-[1200px] flex-col w-full mx-auto flex">
        <div className="w-[600px] mx-auto">
          <img
            className="w-full h-40 object-contain"
            src={data?.cover_url || ""}
          />
          <h1 className="text-center">{data?.title}</h1>
          <h1 className="text-center mt-3">{data?.description}</h1>
        </div>
        <div className="flex justify-between items-center mx-auto">
          <ViewForm form_fields={data?.form_fields || []} />
        </div>
        <FormFooter />
      </div>
    </>
  );
};

export default View;
