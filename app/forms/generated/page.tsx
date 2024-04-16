import { generateForm } from "@/app/actions/forms";
import FormGenerator from "@/components/forms/form";
import { redirect } from "next/navigation";

export default async function FormByIdPage({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const query = searchParams?.query;
  const model = searchParams?.model;

  if (Array.isArray(query) || !query || Array.isArray(model) || !model) {
    redirect("/forms/create");
  }

  const data = await generateForm(query, model as Model);
  return <FormGenerator formFields={data?.text} />;
}
