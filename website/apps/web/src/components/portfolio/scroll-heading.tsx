import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DisplayHeading } from "./typography";

/** Lines rise through a typographic mask in response to vertical scroll, not a timer. */
export function ScrollHeading({
  id,
  lines,
  className,
}: {
  id: string;
  lines: ReactNode[];
  className?: string;
}) {
  return (
    <DisplayHeading id={id} className={cn("scroll-heading", className)}>
      {lines.map((line, index) => (
        <span className="scroll-heading__mask" key={index}>
          <span
            className="scroll-heading__line"
            style={{ "--line-end": `${24 + index * 7}%` } as CSSProperties}
          >
            {line}
          </span>
          {index < lines.length - 1 && " "}
        </span>
      ))}
    </DisplayHeading>
  );
}
