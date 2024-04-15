"use client";
import { Button } from "@/components/ui/button";
import { renderFields } from "@/lib/form";
import React, { Fragment, useState } from "react";
import { Form } from "react-final-form";

type Props = {};

const View = (props: Props) => {
  const [fields, setFields] = useState([
    {
      label: "Name",
      name: "name",
      type: "INPUT_TEXT",
      placeholder: "Enter your full name",
      required: true,
      validationType: "LENGTH",
      minValue: 2,
      maxValue: 50,
      minError: "Name must be at least 2 characters long",
      maxError: "Name cannot exceed 50 characters",
      errorMessage: "Please enter a valid name",
      order: 1,
    },
    {
      label: "Date of Birth",
      name: "dob",
      type: "DATE_PICKER",
      placeholder: "Select your date of birth",
      required: true,
      errorMessage: "Please select your date of birth",
      order: 2,
    },
    {
      label: "Contact Number",
      name: "contactNumber",
      type: "INPUT_NUMBER",
      placeholder: "Enter your contact number",
      required: true,
      validationType: "REGEX",
      regex: "^[0-9]{10}$",
      regexError: "Please enter a valid 10-digit contact number",
      errorMessage: "Please enter a valid contact number",
      order: 3,
    },
    {
      label: "Email Address",
      name: "email",
      type: "INPUT_EMAIL",
      placeholder: "Enter your email address",
      required: true,
      errorMessage: "Please enter a valid email address",
      order: 4,
    },
    {
      label: "Preferred Grandfather Name",
      name: "grandfatherName",
      type: "INPUT_TEXT",
      placeholder: "Enter your preferred grandfather name",
      required: true,
      validationType: "LENGTH",
      minValue: 2,
      maxValue: 20,
      minError: "Name must be at least 2 characters long",
      maxError: "Name cannot exceed 20 characters",
      errorMessage: "Please enter a valid name for grandfather",
      order: 5,
    },
    {
      label: "Number of Grandchildren",
      name: "numberOfGrandchildren",
      type: "INPUT_NUMBER",
      placeholder: "Enter the number of grandchildren",
      required: true,
      validationType: "REGEX",
      regex: "^[0-9]+$",
      regexError: "Please enter a valid number",
      errorMessage: "Please enter a valid number of grandchildren",
      order: 6,
    },
    {
      label: "About Your Excitement",
      name: "excitementLevel",
      type: "INPUT_TEXT_AREA",
      placeholder: "Share your excitement about becoming a grandfather",
      required: true,
      validationType: "LENGTH",
      minValue: 10,
      maxValue: 300,
      minError: "Excitement must be at least 10 characters long",
      maxError: "Excitement cannot exceed 300 characters",
      errorMessage: "Please share your excitement",
      order: 8,
    },
    {
      label: "Gift Ideas for Grandchildren",
      name: "giftIdeas",
      type: "INPUT_TEXT_AREA",
      placeholder: "Share your gift ideas for your grandchildren",
      required: false,
      validationType: "LENGTH",
      maxValue: 500,
      maxError: "Gift ideas cannot exceed 500 characters",
      errorMessage: "Please enter valid gift ideas",
      order: 9,
    },
    {
      label: "Agreement",
      name: "agreement",
      type: "INPUT_CHECKBOX",
      required: true,
      options: ["I agree to be a loving and caring grandfather"],
      errorMessage: "Please agree to become a loving and caring grandfather",
      order: 10,
    },
  ]);

  const onSubmit = async (values: Record<string, any>) => {
    console.log(values);
  };

  return (
    <div>
      <>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, errors }) => {
            return (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 px-10 mt-10"
              >
                {fields
                  .sort((field1, field2) => field1.order - field2.order)
                  .map((field) => (
                    <Fragment key={field.name}>{renderFields(field)}</Fragment>
                  ))}

                <Button type="submit">Submit</Button>
              </form>
            );
          }}
        />
      </>
    </div>
  );
};

export default View;
