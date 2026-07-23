export const typography = {
  display: {
    xl: "text-4xl md:text-5xl font-bold tracking-tight",
    lg: "text-3xl md:text-4xl font-bold",
    md: "text-2xl md:text-3xl font-bold",
  },

  heading: {
    h1: "text-2xl md:text-3xl font-bold",
    h2: "text-xl md:text-2xl font-semibold",
    h3: "text-lg md:text-xl font-semibold",
    h4: "text-base md:text-lg font-semibold",
  },

  body: {
    lg: "text-base",
    md: "text-sm",
    sm: "text-xs",
  },

  label: {
    lg: "text-sm font-medium",
    md: "text-xs font-medium",
    sm: "text-[11px] font-medium uppercase tracking-wide",
  },

  button: {
    lg: "text-base font-semibold",
    md: "text-sm font-semibold",
    sm: "text-xs font-semibold",
  },

  caption: {
    md: "text-xs text-muted-foreground",
    sm: "text-[10px] text-muted-foreground",
  },

  number: {
    hero: "text-4xl md:text-5xl font-bold",
    large: "text-2xl md:text-3xl font-bold",
    medium: "text-xl md:text-2xl font-semibold",
  },
} as const;
