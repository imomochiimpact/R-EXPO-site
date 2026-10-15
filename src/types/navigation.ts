import type { AccentTone } from "./tone";

export type NavItem = {
  label: string;
  href: string;
  icon?: string;
  tone: AccentTone;
  published: boolean;
};
