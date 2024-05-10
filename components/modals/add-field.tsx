"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fieldTypes, regexTypes, validationTypes } from "@/lib/data/form";
import { Checkbox } from "../ui/checkbox";
import { Field, Form } from "react-final-form";
import useGlobalStore from "@/lib/stores/global";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/supabase";

type Props = {
  formId: string;
  formData: Tables<"forms"> & { form_fields: Tables<"form_fields">[] };
};

export const AddFieldModal = ({ formId, formData }: Props) => {
  const { addModalOpen, toggleAddModal, addFieldOrder } = useGlobalStore();
  const supabase = createClient();

  const onSubmit = async (values: Omit<Tables<"form_fields">, "id">) => {
    const body: Omit<Tables<"form_fields">, "id"> = {
      ...values,
      form_id: parseInt(formId),
      form_title: formData.title,
      field_order: formData.form_fields.length,
      name: "field_one",
    };
    const { data, error } = await supabase
      .from("form_fields")
      .insert(body)
      .single();
  };

  return (
    <Dialog open={addModalOpen} onOpenChange={toggleAddModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Fields</DialogTitle>
          <DialogDescription>
            Make changes to your field here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 flex flex-col gap-4 h-[600px] overflow-scroll px-4">
          <Form
            initialValues={
              {
                // label: "",
                // field_type: "",
                // placeholder: "",
                // required: false,
                // default_value: "",
                // help_text: "",
                // validation_type: "",
                // regex: "",
                // min_value: 0,
                // max_value: 0,
                // min_error: "",
                // max_error: "",
                // regex_type: "",
                // regex_error: "",
              }
            }
            onSubmit={onSubmit}
          >
            {({ handleSubmit, values, error }) => {
              const isLengthValidation = values.validation_type === "LENGTH";
              const isRegexValidation = values.validation_type === "REGEX";
              const showValidationType =
                values.field_type !== "INPUT_CHECKBOX" &&
                values.field_type !== "INPUT_RADIO" &&
                values.field_type !== "COLOR_PICKER" &&
                values.field_type !== "DATE_PICKER";
              return (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="label"
                    render={({ input }) => (
                      <div>
                        <Label>Label</Label>
                        <Input
                          value={input.label}
                          onChange={input.onChange}
                          placeholder="Label"
                        />
                      </div>
                    )}
                  />
                  <Field
                    name="field_type"
                    render={({ input }) => (
                      <div>
                        <Label>Field Type</Label>
                        <Select
                          value={input.value}
                          onValueChange={(val) => {
                            input.onChange(val);
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a field" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {Object.entries(fieldTypes).map(
                                ([value, label], i) => (
                                  <SelectItem value={value} key={i}>
                                    {label}
                                  </SelectItem>
                                )
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  ></Field>
                  <div>
                    <Field
                      name="placeholder"
                      render={({ input }) => (
                        <div>
                          <Label>Placeholder</Label>
                          <Input
                            value={input.value}
                            onChange={input.onChange}
                            placeholder="Enter Placeholder"
                          />
                        </div>
                      )}
                    ></Field>
                  </div>
                  <Field
                    name="required"
                    render={({ input }) => (
                      <div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="required"
                            value={input.value}
                            onChange={input.onChange}
                          />
                          <Label htmlFor="required">Is It Required?</Label>
                        </div>
                      </div>
                    )}
                  ></Field>
                  <Field
                    name="default_value"
                    render={({ input }) => (
                      <div>
                        <Label>Default Value</Label>
                        <Input
                          value={input.value}
                          onChange={input.onChange}
                          placeholder="Please enter default value"
                        />
                      </div>
                    )}
                  ></Field>
                  <Field
                    name="help_text"
                    render={({ input }) => (
                      <div>
                        <Label>Help Text</Label>
                        <Input
                          value={input.value}
                          onChange={input.onChange}
                          placeholder="Please enter help text"
                        />
                      </div>
                    )}
                  ></Field>

                  {showValidationType && (
                    <Field name="validation_type">
                      {({ input }) => (
                        <div>
                          <Label>Validation Type</Label>
                          <Select
                            value={input.validationType}
                            onValueChange={(val) => {
                              input.onChange(val);
                            }}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a validation type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {Object.entries(validationTypes).map(
                                  ([value, label], i) => (
                                    <SelectItem value={value} key={i}>
                                      {label}
                                    </SelectItem>
                                  )
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </Field>
                  )}
                  {isLengthValidation && showValidationType && (
                    <>
                      <div className="flex gap-4">
                        <Field
                          name="min_value"
                          render={({ input }) => (
                            <div>
                              <Label>Min Value</Label>
                              <Input
                                type="number"
                                value={input.value}
                                onChange={input.onChange}
                                placeholder="Please enter min value"
                              />
                            </div>
                          )}
                        ></Field>

                        <Field
                          name="max_value"
                          render={({ input }) => (
                            <div>
                              <Label>Max Value</Label>
                              <Input
                                value={input.value}
                                type="number"
                                placeholder="Please enter max value"
                              />
                            </div>
                          )}
                        ></Field>
                      </div>
                      <Field
                        name="min_error"
                        render={({ input }) => (
                          <div>
                            <Label>Min Error</Label>
                            <Input
                              value={input.value}
                              onChange={input.onChange}
                              placeholder="Please enter min error"
                            />
                          </div>
                        )}
                      ></Field>

                      <Field
                        name="max_error"
                        render={({ input }) => (
                          <div>
                            <Label>Max Error</Label>
                            <Input
                              value={input.value}
                              onChange={input.onChange}
                              placeholder="Please enter max error"
                            />
                          </div>
                        )}
                      ></Field>
                    </>
                  )}

                  {isRegexValidation && (
                    <>
                      <Field
                        name="regex_type"
                        render={() => (
                          <div>
                            <Label>Regex Type</Label>
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a regex type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {Object.entries(regexTypes).map(
                                    ([value, label], i) => (
                                      <SelectItem value={value} key={i}>
                                        {label}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      ></Field>
                      <Field
                        name="regex_error"
                        render={({ input }) => (
                          <div>
                            <Label>Regex Error</Label>
                            <Input
                              value={input.value}
                              onChange={input.onChange}
                              placeholder="Enter Regex Error"
                            />
                          </div>
                        )}
                      ></Field>

                      <Field
                        name="regex"
                        render={({ input }) => (
                          <div>
                            <Label>Regex</Label>
                            <Input
                              value={input.value}
                              onChange={input.onChange}
                              placeholder="Enter Regex"
                            />
                          </div>
                        )}
                      ></Field>
                    </>
                  )}
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              );
            }}
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
