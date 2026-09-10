import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./icon";

export function TextLink({
  children,
  className,
  icon = "external",
  ...props
}: ComponentPropsWithoutRef<"a"> & { icon?: IconName }) {
  const external = /^https?:\/\//.test(props.href ?? "");
  return (
    <a
      className={cn("text-link", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      <Icon name={icon} size={18} />
    </a>
  );
}
