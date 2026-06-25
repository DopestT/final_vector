interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "green" | "red" | "muted" | "blue";
  className?: string;
}

const variantStyles = {
  gold: { color: "var(--dl-gold-light)", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" },
  green: { color: "var(--dl-green)", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" },
  red: { color: "var(--dl-red)", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" },
  muted: { color: "var(--dl-muted-light)", background: "var(--dl-card)", border: "1px solid var(--dl-border)" },
  blue: { color: "#60a5fa", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" },
};

export default function Badge({ children, variant = "muted", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
}
