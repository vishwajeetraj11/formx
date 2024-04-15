import { AddFieldModal } from "@/components/modals/add-field";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <AddFieldModal />
    </div>
  );
}
