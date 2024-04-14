"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

const GenerateBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  // TODO: We eventually get this value from global state
  const model: Model = "openai";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchTerm) {
      startTransition(() => {
        router.push(
          `/forms/generated?query=${encodeURIComponent(
            searchTerm,
          )}&model=${model}`,
        );
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        disabled={isPending}
      />
      <Button disabled={isPending}>Generate</Button>
    </form>
  );
};

export default GenerateBar;
