"use client";
import React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useField } from "react-final-form";
import { Label } from "@/components/ui/label";
import Message from "./Message";

type Props = {
  field: any;
};

const FormDatePicker = ({ field }: Props) => {
  const { input, meta } = useField(field.name);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex flex-col gap-2">
            <Label>{field.label}</Label>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !input.value && "text-muted-foreground"
              )}
              type="button"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {input?.value ? (
                format(input.value, "PPP")
              ) : (
                <span>{field.placeholder}</span>
              )}
            </Button>
            {(field.helpText || (meta.touched && meta.error)) && (
              <Message field={field} meta={meta} key={JSON.stringify(meta)} />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={input.value}
            onSelect={(date) => {
              input.onChange(date);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default FormDatePicker;
