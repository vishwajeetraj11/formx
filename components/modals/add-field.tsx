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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fieldTypes, regexTypes } from "@/lib/data/form";
import { Checkbox } from "../ui/checkbox";

export const AddFieldModal = () => {
  return (
    <Dialog open>
      <DialogTrigger asChild>
        <Button variant="outline">Add Field</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <Label>Label</Label>
            <Input placeholder="Label" />
          </div>
          <div>
            <Label>Field Type</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a field" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(fieldTypes).map(([value, label], i) => (
                    <SelectItem value={value} key={i}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
          <div className="flex gap-4">
            {" "}
            <div>
              <Label>Min Value</Label>
              <Input type="number" placeholder="Please enter min value" />
            </div>
            <div>
              <Label>Max Value</Label>
              <Input type="number" placeholder="Please enter max value" />
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
          <div>
            <Label>Regex Type</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a regex type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(regexTypes).map(([value, label], i) => (
                    <SelectItem value={value} key={i}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
