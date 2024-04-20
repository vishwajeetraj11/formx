import React from "react";
import { createClient } from "@/utils/supabase/server";
import PieChart from "./PieChart";

type Props = {
  fieldId: string;
};

const FieldAnalytics = async (props: Props) => {
  const { fieldId } = props;

  const supabase = createClient();
  const { data: field } = await supabase
    .from("form_fields")
    .select()
    .eq("id", fieldId)
    .single();
  if (
    field &&
    !["SELECT", "INPUT_RADIO", "MULTI_SELECT"].includes(field.field_type)
  ) {
    return <>woops</>;
  }
  const { data } = await supabase.rpc("getfreqofrespbyid", {
    fieldid: parseInt(fieldId),
  });
  const pieData = data?.map((item) => ({
    name: item.response,
    value: item.response_count,
  }));

  return (
    <div>
      {pieData && pieData?.length !== 0 ? <PieChart data={pieData} /> : null}
    </div>
  );
};

export default FieldAnalytics;
