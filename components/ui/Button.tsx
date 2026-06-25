"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variantStyles = {
  primary: {
    background: "var(--dl-gold)",
    color: "#080c1a",
    border: "none",
  },
  secondary: {
    background: "var(--dl-card)",
    color: "var(--dl-text)",
    border: "1px solid var(--dl-border)",
  },
  danger: {
    background: "rgba(239,68,68,0.15)",
    color: "var(--dl-red)",
    border: "1px solid rgba(239,68,68,0.3)",
  },
  ghost: {
    background: "transparent",
    color: "var(--dl-muted-light)",
    border: "none",
  },
  outline: {
    background: "transparent",
    color: "var(--dl-gold)",
    border: "1px solid var(--dl-gold-dim)",
  },
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-opacity hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed ${sizeStyles[size]} ${className}`}
      style={variantStyles[variant]}
      {...props}
    >
      {children}
    </button>
  );
}
