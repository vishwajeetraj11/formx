import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="grid place-content-center h-screen">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
  );
}
