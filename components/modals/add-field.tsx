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

export const AddFieldModal = () => {
  const { addModalOpen, toggleAddModal } = useGlobalStore();

  const onSubmit = (values: Record<string, any>) => {
    console.log(values);
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
            initialValues={{
              label: "",
              type: "",
              placeholder: "",
              required: false,
              defaultValue: "",
              helpText: "",
              validationType: "",
              regex: "",
            }}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, values, error }) => {
              const isLengthValidation = values.validationType === "LENGTH";
              const isRegexValidation = values.validationType === "REGEX";
              const showValidationType =
                values.type !== "INPUT_CHECKBOX" &&
                values.type !== "INPUT_RADIO" &&
                values.type !== "COLOR_PICKER" &&
                values.type !== "DATE_PICKER";
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
                  <Field name="type">
                    {({ input }) => (
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
                  </Field>
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
                  <Field name="required">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="required" />
                        <Label htmlFor="required">Is It Required?</Label>
                      </div>
                    </div>
                  </Field>
                  <Field name="defaultValue">
                    <div>
                      <Label>Default Value</Label>
                      <Input placeholder="Please enter default value" />
                    </div>
                  </Field>
                  <Field
                    name="helpText"
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
                    <Field name="validationType">
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
                          name="minValue"
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
                          name="maxValue"
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
                        name="minError"
                      ></Field>

                      <Field
                        name="maxError"
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
                        name="regexType"
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
                        name="regexError"
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
