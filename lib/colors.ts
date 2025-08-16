export const colors = {
  // Primary Colors
  orange: {
    primary: "hsl(26, 100%, 55%)",
    pale: "hsl(25, 100%, 94%)",
  },

  // Neutral Colors
  blue: {
    veryDark: "hsl(220, 13%, 13%)",
    darkGrayish: "hsl(219, 9%, 45%)",
    grayish: "hsl(220, 14%, 75%)",
    lightGrayish: "hsl(223, 64%, 98%)",
  },

  // Base Colors
  white: "hsl(0, 0%, 100%)",
  black: {
    full: "hsl(0, 0%, 0%)",
    lightbox: "hsl(0, 0%, 0%, 0.75)", // 75% opacity for lightbox
  },
} as const;

// CSS Custom Properties for use in CSS
export const cssVariables = {
  "--orange-primary": colors.orange.primary,
  "--orange-pale": colors.orange.pale,
  "--blue-very-dark": colors.blue.veryDark,
  "--blue-dark-grayish": colors.blue.darkGrayish,
  "--blue-grayish": colors.blue.grayish,
  "--blue-light-grayish": colors.blue.lightGrayish,
  "--white": colors.white,
  "--black-75": colors.black.lightbox,
} as const;

// Tailwind CSS color classes (if you want to use them)
export const tailwindColors = {
  orange: {
    50: colors.orange.pale,
    500: colors.orange.primary,
  },
  blue: {
    50: colors.blue.lightGrayish,
    300: colors.blue.grayish,
    600: colors.blue.darkGrayish,
    900: colors.blue.veryDark,
  },
  gray: {
    50: colors.blue.lightGrayish,
    300: colors.blue.grayish,
    600: colors.blue.darkGrayish,
    900: colors.blue.veryDark,
  },
} as const;

// Type exports for TypeScript
export type ColorScheme = typeof colors;
export type CSSVariables = typeof cssVariables;
export type TailwindColors = typeof tailwindColors;
