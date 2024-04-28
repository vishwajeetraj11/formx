"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTransition } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";

function GenerateInput() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  // TODO: We eventually get this value from global state
  const model: Model = "openai";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (description) {
      startTransition(() => {
        router.push(
          `/forms/generated?query=${encodeURIComponent(
            description,
          )}&model=${model}`,
        );
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <label htmlFor="description" className="sr-only">
          Form Description
        </label>
        <textarea
          rows={2}
          name="description"
          id="description"
          className="block w-full pt-2.5 resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Description of form you want to generate..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex">
            <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
              disabled
            >
              <PaperClipIcon
                className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="text-sm italic text-gray-500 group-hover:text-gray-600">
                Attach a file
              </span>
            </button>
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              disabled={isPending}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default GenerateInput;
