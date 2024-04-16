import { createClient } from "@/utils/supabase/client";
import AuthButton from "../AuthButton";
import MainLogo from "../MainLogo";

export default async function FormNav() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <MainLogo />
        {user && <AuthButton />}
      </div>
    </nav>
  );
}
