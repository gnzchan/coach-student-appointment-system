import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-44 w-full flex flex-col items-center justify-center gap-6">
      <span className="text-center text-3xl">Page not found</span>
      <Link href="/">
        Return to <span className="italic underline">home</span> page
      </Link>
    </div>
  );
}
