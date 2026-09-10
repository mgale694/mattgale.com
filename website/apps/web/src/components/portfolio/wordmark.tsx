import { cn } from "@/lib/utils";
export function Wordmark({ className }: { className?: string }) {
  return (
    <a
      href="/#home"
      className={cn("wordmark", className)}
      aria-label="Matthew Gale, back to top"
    >
      MG<span>.</span>
    </a>
  );
}
