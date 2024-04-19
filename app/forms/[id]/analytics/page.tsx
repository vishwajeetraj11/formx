import FieldAnalytics from "@/components/charts/FieldAnalytics";
import { PieChartLoader } from "@/components/charts/PieChart";
import { fieldTypes } from "@/lib/data/form";
import { createClient } from "@/utils/supabase/server";
import { Card, Subtitle, Text, Title } from "@tremor/react";
import Link from "next/link";
import React, { Suspense } from "react";

interface Props {
  params: { id: string };
  searchParams: { fieldId: string };
}

const getFieldsWithLimitedResponses = (data: any) => {
  const fieldIds: number[] = [];
  data.forEach((field: any) => {
    if (["SELECT", "INPUT_RADIO", "MULTI_SELECT"].includes(field.field_type)) {
      fieldIds.push(field.id);
    }
  });
  return fieldIds;
};

const AnalyticsByID = async (props: Props) => {
  const fieldId = props.searchParams.fieldId;
  const id = props.params.id;
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const query = `
  // title, description, cover_url,
  // responses (
  //   *,
  //   field_id (id, label, field_type
  //   )
  // )`;

  // to get all responses nested under field id
  // const query = `
  // title, description, cover_url,
  // form_fields(id, label, field_type, responses(
  //   user_id, response, id
  // )
  // )
  // )`;

  const query = `
  title, description, cover_url, 
  form_fields(id, label, field_type
  )`;
  // const query = `*, field_id(id)`;
  const { data } = await supabase.from("forms").select(query).eq("id", id);
  const fieldIds = getFieldsWithLimitedResponses(data?.[0]?.form_fields as any);
  // const d = getFequencyOfResponses(fieldIds);

  // const { data } =
  // console.log(data);
  // const responses = await supabase
  //   .from("responses")
  //   .select(query)
  //   .eq("form_id", id);

  // const something = await supabase.from("responses").select();
  const fields = data?.[0]?.form_fields;
  return (
    <div>
      <Title className="my-5">Fields</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {fields?.map((field) => (
          <Link
            key={field.id}
            href={`/forms/${id}/analytics?fieldId=${field.id}`}
          >
            <Card>
              <Subtitle>{field.label}</Subtitle>
              <Text>{fieldTypes[field.field_type]}</Text>
            </Card>
          </Link>
        ))}
      </div>
      <Suspense fallback={<PieChartLoader />}>
        {fieldId && <FieldAnalytics fieldId={fieldId} />}
      </Suspense>
    </div>
  );
};

export default AnalyticsByID;
