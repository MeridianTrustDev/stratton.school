import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen text-white flex flex-col gap-4 items-center justify-center text-center">
      <div>
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-4xl font-semibold">Not Found</h2>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-medium">Could not find requested page</p>
        <Link
          prefetch={false}
          className={cn(buttonVariants({ variant: "secondary" }))}
          href="/"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
