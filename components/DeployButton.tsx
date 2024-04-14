import Link from "next/link";

export default function FormxLogo() {
  return (
    <Link
      href="/"
      className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border font-mono font-semibold"
      rel="noreferrer"
    >
      FORMX
    </Link>
  );
}
