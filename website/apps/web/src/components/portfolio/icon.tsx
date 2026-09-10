import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Contrast,
  Copy,
  Github,
  Linkedin,
  Menu,
  Pause,
  Play,
  Plus,
  Printer,
  X,
} from "lucide-react";

const icons = {
  arrowDown: ArrowDown,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  external: ArrowUpRight,
  check: Check,
  contrast: Contrast,
  copy: Copy,
  github: Github,
  linkedin: Linkedin,
  menu: Menu,
  pause: Pause,
  play: Play,
  plus: Plus,
  print: Printer,
  close: X,
};
export type IconName = keyof typeof icons;

/** Decorative glyph. The enclosing link/button supplies its accessible name. */
export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const Glyph = icons[name];
  return (
    <Glyph
      size={size}
      strokeWidth={1.5}
      className={className}
      aria-hidden="true"
      focusable="false"
    />
  );
}
