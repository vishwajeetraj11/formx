import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import MainLogo from "@/components/MainLogo";
import Link from "next/link";
import { AddFieldModal } from "@/components/modals/add-field";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <MainLogo />
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <AddFieldModal />
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Made by{" "}
          <Link href="/" className="font-bold hover:underline" rel="noreferrer">
            Makkhan Labs
          </Link>
        </p>
      </footer>
    </div>
  );
}
