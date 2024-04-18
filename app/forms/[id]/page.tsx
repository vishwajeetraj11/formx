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
    .eq("id", id)
    .single();

  if (!data) {
    return <></>;
  }

  // console.log(data);

  return (
    <>
      <FormNav />
      <div className="max-w-[1200px] w-full mx-auto flex">
        <FormDetails
          formDetails={{
            id: data?.id,
            title: data?.title,
            cover_url: data?.cover_url,
            description: data?.description,
          }}
        />
        {data?.form_fields && <FormGenerator formFields={data?.form_fields} />}
      </div>
    </>
  );
};

export default FormByIdPage;
