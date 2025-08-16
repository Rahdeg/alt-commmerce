export const typography = {
  // Font Family
  fontFamily: {
    sans: "var(--font-kumbh-sans), system-ui, sans-serif",
    mono: "var(--font-kumbh-sans), monospace",
  },

  // Font Weights (Kumbh Sans supports 400 and 700)
  fontWeight: {
    normal: "400",
    bold: "700",
  },

  // Font Sizes
  fontSize: {
    // Base paragraph size as specified
    base: "16px",

    // Common sizes for consistency
    xs: "12px",
    sm: "14px",
    md: "16px", // Same as base
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px",
  },

  // Line Heights
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },

  // Letter Spacing
  letterSpacing: {
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
  },
} as const;

// CSS Custom Properties for typography
export const typographyCSSVariables = {
  "--font-family-sans": typography.fontFamily.sans,
  "--font-family-mono": typography.fontFamily.mono,
  "--font-weight-normal": typography.fontWeight.normal,
  "--font-weight-bold": typography.fontWeight.bold,
  "--font-size-base": typography.fontSize.base,
  "--line-height-normal": typography.lineHeight.normal,
} as const;

// Tailwind CSS typography classes
export const tailwindTypography = {
  fontFamily: {
    sans: [typography.fontFamily.sans],
    mono: [typography.fontFamily.mono],
  },
  fontSize: typography.fontSize,
  fontWeight: typography.fontWeight,
  lineHeight: typography.lineHeight,
  letterSpacing: typography.letterSpacing,
} as const;

// Type exports for TypeScript
export type Typography = typeof typography;
export type TypographyCSSVariables = typeof typographyCSSVariables;
export type TailwindTypography = typeof tailwindTypography;
