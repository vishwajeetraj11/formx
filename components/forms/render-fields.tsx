import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import React from "react";
import { reorder } from "@/lib/utils/form";
import { List } from "../dnd/list";
import { Tables } from "@/types/supabase";

interface Props {
  fields: Tables<"form_fields">[];
}

export const RenderFields = (props: Props) => {
  const [fields, setFields] = useState(props.fields);

  const onDragStart = () => {
    // Add a little vibration if the browser supports it.
    // Add's a nice little physical feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newFields = reorder(
      fields,
      result.source.index,
      result.destination.index
    );

    setFields(newFields);
  };

  return (
    <>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div>
          <List listId="list" fields={fields} />
        </div>
      </DragDropContext>
    </>
  );
};
