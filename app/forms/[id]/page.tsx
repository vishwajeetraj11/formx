import FormDetails from "@/components/common/form-details";
import FormGenerator from "@/components/forms/form";
import { AddFieldModal } from "@/components/modals/add-field";
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
        <AddFieldModal />
      </div>
    </>
  );
};

export default FormByIdPage;
