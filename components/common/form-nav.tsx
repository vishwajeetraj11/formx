import { createClient } from "@/utils/supabase/client";
import AuthButton from "../AuthButton";
import MainLogo from "../MainLogo";
import Link from "next/link";

export default async function FormNav() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <MainLogo />
        <div className="ml-auto flex gap-4">
          <Link href={"/forms/analytics"}>Analytics</Link>
          <Link href={"/forms/"}>Forms</Link>
        </div>
        {user && <AuthButton />}
      </div>
    </nav>
  );
}
