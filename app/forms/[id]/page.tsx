import FormGenerator from "@/components/forms/form";
import { createClient } from "@/utils/supabase/server";

interface Props {
  params: { id: string };
}

const FormByIdPage = async (props: Props) => {
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
    <div className="max-w-[1200px] mx-auto">
      {data?.[0]?.form_fields && (
        <FormGenerator formFields={data?.[0]?.form_fields} />
      )}
    </div>
  );
};

export default FormByIdPage;
