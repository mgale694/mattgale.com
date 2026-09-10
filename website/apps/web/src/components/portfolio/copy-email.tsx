import { useEffect, useRef, useState } from "react";
import { Icon } from "./icon";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timeout.current), []);
  const copy = async () => {
    clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    timeout.current = setTimeout(() => setState("idle"), 4000);
  };
  return (
    <div className="copy-email">
      <button className="text-link" onClick={copy}>
        <Icon name={state === "copied" ? "check" : "copy"} size={14} />
        Copy email address
      </button>
      <span role="status">
        {state === "copied"
          ? "Copied to clipboard"
          : state === "failed"
            ? "Couldn’t copy. Select the email address above."
            : ""}
      </span>
    </div>
  );
}
