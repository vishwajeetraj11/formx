"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

const ResponsesById = async (props: Props) => {
  const id = props.params.id;
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const query = `*,responses (*, field_id (*))`;
  const responses = await supabase.from("forms").select(query).eq("id", id);
  console.log(responses);
  return <>p</>;
};

export default ResponsesById;
