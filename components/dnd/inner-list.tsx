import { DroppableProvided } from "@hello-pangea/dnd";
import { FieldInnerListMemo } from "./field-inner-list";
import { Tables } from "@/types/supabase";

interface InnerListProps {
  dropProvided: DroppableProvided;
  fields: Tables<"form_fields">[];
}

export const InnerList = (props: InnerListProps) => {
  const { fields, dropProvided } = props;
  return (
    <div ref={dropProvided.innerRef}>
      <FieldInnerListMemo fields={fields} />
      {dropProvided.placeholder}
    </div>
  );
};
