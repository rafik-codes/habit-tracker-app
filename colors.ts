/**
 * Semantic design tokens for Habit Tracker.
 *
 * Calm, focused teal-and-cream palette — meant to feel like a personal
 * ritual space, not a clinical checklist app.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: "#132A28",
    tint: "#0F9B8E",

    // Core surfaces
    background: "#FBF8F3",
    foreground: "#132A28",

    // Cards / elevated surfaces
    card: "#FFFFFF",
    cardForeground: "#132A28",

    // Primary action color (buttons, links, active states)
    primary: "#0F9B8E",
    primaryForeground: "#FFFFFF",

    // Secondary / less-emphasis interactive surfaces
    secondary: "#EFE9DD",
    secondaryForeground: "#132A28",

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: "#F0ECE3",
    mutedForeground: "#7A8C89",

    // Accent highlights (badges, selected items, focus rings)
    accent: "#E4F3F0",
    accentForeground: "#0F9B8E",

    // Destructive actions (delete, error states)
    destructive: "#E0654B",
    destructiveForeground: "#FFFFFF",

    // Borders and input outlines
    border: "#E7E1D4",
    input: "#E7E1D4",
  },

  dark: {
    text: "#EDF5F3",
    tint: "#2DD4C0",

    background: "#0E1615",
    foreground: "#EDF5F3",

    card: "#161F1E",
    cardForeground: "#EDF5F3",

    primary: "#2DD4C0",
    primaryForeground: "#08201D",

    secondary: "#1E2827",
    secondaryForeground: "#EDF5F3",

    muted: "#1B2423",
    mutedForeground: "#8AA09C",

    accent: "#16302C",
    accentForeground: "#2DD4C0",

    destructive: "#E88068",
    destructiveForeground: "#1A0B08",

    border: "#243130",
    input: "#243130",
  },

  // Border radius (in px). Applies to cards, buttons, inputs, and modals.
  radius: 16,
};

export default colors;

export const Colors = {
  // ... احتفظ بالأكواد والأسطر السابقة هنا دون حذفها لكي لا يتوقف شيء

  // وأضف هذا الجزء في نهاية الملف:
  light: {
    text: "#11181C",
    background: "#fff",
    tint: "#0a7ea4",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#0a7ea4",
    cardBackground: "#f8f9fa",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: "#fff",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#fff",
    cardBackground: "#1e2022",
  },
};
