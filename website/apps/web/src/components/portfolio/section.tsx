import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./typography";

export function Section({
  id,
  tone = "ink",
  className,
  ...props
}: ComponentPropsWithoutRef<"section"> & {
  id: string;
  tone?: "ink" | "paper";
}) {
  return (
    <section
      id={id}
      data-portfolio-section
      data-tone={tone}
      className={cn("portfolio-section", `tone-${tone}`, className)}
      {...props}
    />
  );
}

export function SectionLabel({
  number,
  children,
  note,
}: {
  number: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="section-label">
      <Eyebrow>
        {number} / {children}
      </Eyebrow>
      <span className="section-label__rule" aria-hidden="true" />
      {note && <Eyebrow className="section-label__note">{note}</Eyebrow>}
    </div>
  );
}

export function Divider({ label, end }: { label: string; end?: string }) {
  return (
    <div className="editorial-divider">
      <Eyebrow>{label}</Eyebrow>
      <span className="editorial-divider__hatch" aria-hidden="true" />
      {end && <Eyebrow>{end}</Eyebrow>}
    </div>
  );
}
