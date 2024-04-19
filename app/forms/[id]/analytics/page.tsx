import { createClient } from "@/utils/supabase/server";
import React from "react";

interface Props {
  params: { id: string };
}
const AnalyticsByID = async (props: Props) => {
  const id = props.params.id;
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //   const query = `*,responses (*, field_id (*))`;
  const query = `*, field_id(id)`;
  //   const responses = await supabase.from("forms").select(query).eq("id", id);
  const responses = await supabase
    .from("responses")
    .select(query)
    .eq("form_id", id);

  const something = await supabase.from("responses").select();

  return (
    <div>
      <pre>{JSON.stringify(responses, null, 2)}</pre>
    </div>
  );
};

export default AnalyticsByID;
