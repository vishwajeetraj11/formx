"use client";
import React from "react";

type Props = {
  description: string;
};

const Description = ({ description }: Props) => {
  return (
    <p
      className="no-tailwindcss-base text-center mt-3"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
};

export default Description;
