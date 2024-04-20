"use server";
import FormResponseTable from "@/components/common/form-response-table";
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
  // console.log(responses);
  const surveyResponses = [
    {
      id: 1,
      fullName: "Vishwajeet Raj",
      age: 21,
      gender: "Male",
      orientation: "Straight",
      tantraExperience: "...",
      favoritePosition: "...",
      healthBenefits: "...",
    },
  ];
  return (
    <>
      {/* <pre>{JSON.stringify(responses, null, 2)}</pre> */}
      <FormResponseTable surveyResponses={surveyResponses} />
    </>
  );
};

export default ResponsesById;
