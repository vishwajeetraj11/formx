import FormDetails from "@/components/common/form-details";
import FormNav from "@/components/common/form-nav";
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

  if (!data) {
    return <></>;
  }

  return (
    <>
      <FormNav />
      <div className="max-w-[1200px] w-full mx-auto flex">
        <FormDetails
          formDetails={{
            id: data?.[0]?.id,
            title: data?.[0]?.title,
            cover_url: data?.[0]?.cover_url,
            description: data?.[0]?.description,
          }}
        />
        {data?.[0]?.form_fields && (
          <FormGenerator formFields={data?.[0]?.form_fields} />
        )}
      </div>
    </>
  );
};

export default FormByIdPage;
