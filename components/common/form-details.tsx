import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FormDetails() {
  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Form Details
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="model">Form Title</Label>
            <Input
              id="form-title"
              type="text"
              placeholder="Enter your form title"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="form-banner">Form Banner</Label>
            <Input
              id="form-banner"
              type="url"
              placeholder="https://unsplash.com/photos/a-marble-pattern-with-a-pastel-blue-and-beige-color-scheme-5jgvVlkI0mw"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="You are a..."
              className="min-h-[9.5rem]"
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
