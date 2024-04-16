import { Droppable } from "@hello-pangea/dnd";
import type {
  DroppableProvided,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";
import React from "react";
import { getBackgroundColor } from "@/lib/utils/form";
import { InnerList } from "./inner-list";
import { Tables } from "@/types/supabase";

export const List = ({
  listId,
  fields,
}: {
  listId: string;
  fields: Tables<"form_fields">[];
}) => {
  return (
    <Droppable droppableId={listId}>
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot
      ) => (
        <div
          style={{
            backgroundColor: getBackgroundColor(
              dropSnapshot.isDraggingOver,
              Boolean(dropSnapshot.draggingFromThisWith)
            ),
          }}
          {...dropProvided.droppableProps}
        >
          <InnerList fields={fields} dropProvided={dropProvided} />
        </div>
      )}
    </Droppable>
  );
};
