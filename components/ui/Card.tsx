interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export default function Card({ children, className = "", hover = false, style }: CardProps) {
  return (
    <div
      className={`rounded-xl p-5 ${hover ? "transition-colors cursor-pointer" : ""} ${className}`}
      style={{
        background: "var(--dl-card)",
        border: "1px solid var(--dl-border)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
