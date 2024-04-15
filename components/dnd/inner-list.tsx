import { DroppableProvided } from "@hello-pangea/dnd";
import { FieldInnerListMemo } from "./field-inner-list";

interface InnerListProps {
  dropProvided: DroppableProvided;
  fields: any;
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
