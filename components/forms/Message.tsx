import { cn } from "@/lib/utils";
import React from "react";
import { FieldMetaState } from "react-final-form";

type Props = {
  field: any;
  meta: FieldMetaState<string>;
};

const Message = (props: Props) => {
  const { meta, field } = props;
  let text = field.helpText;
  let error = meta.touched && meta.error;
  if (meta.touched && meta.error) {
    text = meta.error;
  }
  return (
    <p
      className={cn(
        error ? "text-rose-600" : "text-gray-600",
        `text-xs ml-3 mt-2`
      )}
    >
      {text}
    </p>
  );
};

export default Message;
