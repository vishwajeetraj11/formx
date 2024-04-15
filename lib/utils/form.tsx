import { DraggableProvided } from "@hello-pangea/dnd";
import { R50, T50 } from "../data/colors";
import { CSSProperties } from "react";

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

export const reorder = <TList extends unknown[]>(
  list: TList,
  startIndex: number,
  endIndex: number
): TList => {
  const result = Array.from(list) as TList;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function getStyle(
  provided: DraggableProvided,
  style?: CSSProperties | null
) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}
