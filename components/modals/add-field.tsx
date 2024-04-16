"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export const AddFieldModal = () => {
  return (
    <Dialog open>
      <DialogTrigger asChild>
        <Button variant="outline">Add Field</Button>
      </DialogTrigger>
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
            onSubmit={() => {}}
          >
            {({ handleSubmit, values }) => {
              const isLengthValidation = values.validationType === "LENGTH";
              const isRegexValidation = values.validationType === "REGEX";
              const showValidationType =
                values.type !== "INPUT_CHECKBOX" &&
                values.type !== "INPUT_RADIO" &&
                values.type !== "COLOR_PICKER" &&
                values.type !== "DATE_PICKER";
              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <Label>Label</Label>
                    <Input placeholder="Label" />
                  </div>
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
                                ),
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </Field>
                  <div>
                    <Label>Placeholder</Label>
                    <Input placeholder="Enter Placeholder" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="required" />
                      <Label htmlFor="required">Is It Required?</Label>
                    </div>
                  </div>
                  <div>
                    <Label>Default Value</Label>
                    <Input placeholder="Please enter default value" />
                  </div>
                  <div>
                    <Label>Help Text</Label>
                    <Input placeholder="Please enter help text" />
                  </div>
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
                              <SelectValue placeholder="Select a regex type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {Object.entries(validationTypes).map(
                                  ([value, label], i) => (
                                    <SelectItem value={value} key={i}>
                                      {label}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </Field>
                  )}
                  {isLengthValidation && (
                    <>
                      <div className="flex gap-4">
                        {" "}
                        <div>
                          <Label>Min Value</Label>
                          <Input
                            type="number"
                            placeholder="Please enter min value"
                          />
                        </div>
                        <div>
                          <Label>Max Value</Label>
                          <Input
                            type="number"
                            placeholder="Please enter max value"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Min Error</Label>
                        <Input placeholder="Please enter min error" />
                      </div>
                      <div>
                        <Label>Max Error</Label>
                        <Input placeholder="Please enter max error" />
                      </div>
                    </>
                  )}

                  {isRegexValidation && (
                    <>
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
                                ),
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Regex Error</Label>
                        <Input placeholder="Enter Regex Error" />
                      </div>
                      <div>
                        <Label>Regex</Label>
                        <Input placeholder="Enter Regex" />
                      </div>
                    </>
                  )}
                </form>
              );
            }}
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
