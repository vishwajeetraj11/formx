import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getUserAvatarUrl } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

export default async function AuthButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      <Image
        src={getUserAvatarUrl({
          email: user?.email ?? "",
          profileAvatarUrl: "",
        })}
        alt="User avatar"
        width={32}
        height={32}
        className="rounded-full"
      />
      <form action={signOut}>
        <Button variant="ghost">
          <LogOut size={16} />
        </Button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      <LogIn size={16} />
    </Link>
  );
}
