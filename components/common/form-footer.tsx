import Link from "next/link";

export default function FormFooter() {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <p>
        Made by{" "}
        <Link href="/" className="font-bold hover:underline" rel="noreferrer">
          Makkhan Labs
        </Link>
      </p>
    </footer>
  );
}
