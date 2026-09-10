import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function DisplayHeading({
  as: Tag = "h2",
  className,
  ...props
}: ComponentPropsWithoutRef<"h2"> & { as?: "h1" | "h2" | "h3" }) {
  return <Tag className={cn("display-heading", className)} {...props} />;
}

export function Eyebrow({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return <span className={cn("eyebrow", className)} {...props} />;
}

export function SignalDot({ className }: { className?: string }) {
  return <span className={cn("signal-dot", className)} aria-hidden="true" />;
}
