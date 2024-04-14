import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormDatePicker from "./form-date-picker";
import { FormFilePicker } from "./form-file-picker";
import { Field } from "react-final-form";
import { FormColorPicker } from "./form-color-picker";
import { FormCheckbox } from "./form-checkbox";
import FormInput from "./form-input";
import Message from "./Message";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type {
  DropResult,
  DraggableProvided,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import React, { CSSProperties } from "react";
import { GripVerticalIcon, Pencil, PlusIcon, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  fields: any;
}

export const R50 = "#FFEBE6";
const T50 = "#E6FCFF";
const N30 = "#EBECF0";

export const getBackgroundColor = (
  isDraggingOver: boolean,
  isDraggingFrom: boolean
): string => {
  if (isDraggingOver) {
    return R50;
  }
  if (isDraggingFrom) {
    return T50;
  }
  return "#FFFFFF";
};

const renderFields = (field: any) => {
  const defaultProps = {
    placeholder: field.placeholder,
    required: field.required,
  };
  // Factory Pattern
  switch (field.type) {
    case "INPUT_TEXT":
      return <FormInput field={field} />;
    case "INPUT_EMAIL":
      return <FormInput field={field} />;
    case "INPUT_URL":
      return <FormInput field={field} />;
    case "INPUT_PASSWORD":
      return <FormInput field={field} />;
    case "INPUT_CHECKBOX":
      return <FormCheckbox field={field} />;
    case "INPUT_NUMBER":
      return <FormInput field={field} />;
    case "INPUT_TEXT_AREA":
      return (
        <Field name={field.name} validate={(value: string) => {}}>
          {({ input, meta }) => (
            <>
              <Label className="mb-2 block">{field.label}</Label>
              <Textarea
                {...defaultProps}
                value={input.value}
                onChange={input.onChange}
              />
              {field.helpText && <Message meta={meta} field={field} />}
            </>
          )}
        </Field>
      );
    case "INPUT_RADIO":
      return (
        <Field name={field.name} validate={(value: string) => {}}>
          {({ input }) => (
            <>
              <Label className="mb-2 block">{field.label}</Label>
              <RadioGroup value={input.value} onChange={input.onChange}>
                {field.options?.map((option: string, i: number) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          )}
        </Field>
      );
    case "SELECT":
      return (
        <Field name={field.name} validate={(value: string) => {}}>
          {({ input }) => (
            <>
              <Label className="mb-2 block">{field.label}</Label>
              <Select value={input.value} onValueChange={input.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option: string, i: number) => (
                    <SelectItem key={i} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </Field>
      );
    case "DATE_PICKER":
      return (
        <Field name={field.name} validate={(value: string) => {}}>
          {({}) => <FormDatePicker field={field} />}
        </Field>
      );
    case "FILE_UPLOAD":
      return (
        <Field
          name={field.name}
          validate={(value: string) => {}}
          render={() => <FormFilePicker field={field} />}
        ></Field>
      );
    case "COLOR_PICKER":
      return (
        <Field
          name={field.name}
          validate={(value: string) => {}}
          render={() => <FormColorPicker field={field} />}
        ></Field>
      );
    default:
      return <></>;
  }
};

const reorder = <TList extends unknown[]>(
  list: TList,
  startIndex: number,
  endIndex: number
): TList => {
  const result = Array.from(list) as TList;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const RenderFields = (props: Props) => {
  const [fields, setFields] = useState(props.fields);

  function onDragStart() {
    // Add a little vibration if the browser supports it.
    // Add's a nice little physical feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }

  function onDragEnd(result: DropResult) {
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
  }

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

const List = ({ listId, fields }: { listId: string; fields: any }) => {
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

interface InnerListProps {
  dropProvided: DroppableProvided;
  fields: any;
}

const InnerList = (props: InnerListProps) => {
  const { fields, dropProvided } = props;
  return (
    <div ref={dropProvided.innerRef}>
      <FieldInnerListMemo fields={fields} />
      {dropProvided.placeholder}
    </div>
  );
};

const FieldInnerList = ({ fields }: { fields: any }) => {
  return (
    <div className="flex flex-col">
      {fields.map((field: any, index: number) => {
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
                    className={cn(
                      "transition-all duration-200",
                      "cursor-pointer invisible group-hover:visible opacity-0 group-hover:opacity-100",
                      "bg-green-500 flex items-center justify-center w-12 h-12 rounded-full absolute top-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                    )}
                  >
                    <PlusIcon size={20} className="mx-4 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {}}
                    className={cn(
                      "transition-all duration-200",
                      "cursor-pointer invisible group-hover:visible opacity-0 group-hover:opacity-100",
                      "bg-rose-500 flex items-center justify-center w-12 h-12 rounded-full absolute top-[100%] right-[0%] translate-x-[-50%] translate-y-[-50%]"
                    )}
                  >
                    <Trash size={20} className="mx-4 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {}}
                    className={cn(
                      "transition-all duration-200",
                      "cursor-pointer invisible group-hover:visible opacity-0 group-hover:opacity-100",
                      "bg-blue-600 flex items-center justify-center w-12 h-12 rounded-full absolute top-[100%] right-[60px] translate-x-[-50%] translate-y-[-50%]"
                    )}
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

const FieldInnerListMemo = React.memo<{ fields: any }>(FieldInnerList);

function getStyle(provided: DraggableProvided, style?: CSSProperties | null) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}
