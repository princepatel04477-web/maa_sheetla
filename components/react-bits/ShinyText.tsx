"use client";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block text-[#b5a89f] bg-clip-text ${
        disabled ? "" : "animate-shimmer"
      } ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(243, 235, 224, 0.4) 0%, rgba(255, 217, 160, 0.95) 50%, rgba(243, 235, 224, 0.4) 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}
