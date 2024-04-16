import { Draggable } from "@hello-pangea/dnd";
import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import React from "react";
import { GripVerticalIcon, Pencil, PlusIcon, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { renderFields } from "@/lib/form";
import { getStyle } from "@/lib/utils/form";
import { Tables } from "@/types/supabase";

const FieldInnerList = ({ fields }: { fields: Tables<"form_fields">[] }) => {
  return (
    <div className="flex flex-col">
      {fields.map((field, index: number) => {
        const iconClasses = [
          "transition-all duration-200",
          "cursor-pointer invisible group-hover:visible opacity-0 group-hover:opacity-100",
          "flex items-center justify-center w-12 h-12 rounded-full absolute top-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
        ];

        return (
          <Draggable key={field.name} draggableId={field.name} index={index}>
            {(
              dragProvided: DraggableProvided,
              dragSnapshot: DraggableStateSnapshot
            ) => (
              <div
                ref={dragProvided.innerRef}
                {...dragProvided.draggableProps}
                {...dragProvided.dragHandleProps}
                style={getStyle(dragProvided, {})}
                data-is-dragging={dragSnapshot.isDragging}
                data-testid={field.name}
                data-index={index}
                className="mt-8 group"
              >
                <div
                  className={cn(
                    "py-4 relative flex rounded-xl items-center flex-1",
                    "border-transparent border-2 hover:border-dashed hover:border-[#DDD]"
                  )}
                >
                  <GripVerticalIcon className="mx-4 text-[#959595]" />
                  <div className="flex flex-col flex-1 pr-8">
                    {renderFields(field)}
                  </div>
                  <button
                    type="button"
                    onClick={() => {}}
                    className={cn(...iconClasses, "bg-green-500")}
                  >
                    <PlusIcon size={20} className="mx-4 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {}}
                    className={cn(...iconClasses, "bg-rose-500")}
                  >
                    <Trash size={20} className="mx-4 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {}}
                    className={cn(...iconClasses, "bg-blue-500")}
                  >
                    <Pencil size={20} className="mx-4 text-white" />
                  </button>
                </div>
              </div>
            )}
          </Draggable>
        );
      })}
    </div>
  );
};

export const FieldInnerListMemo = React.memo<{
  fields: Tables<"form_fields">[];
}>(FieldInnerList);
