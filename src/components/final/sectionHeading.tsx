import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingWithCountProps {
  icon: ReactNode;
  title: string;
  count: number;
  colorClass?: string; // Tailwind color (e.g., "blue", "green")
  className?: string;
}

export function SectionHeading({
  icon,
  title,
  count,
  colorClass = "blue",
  className = "",
}: SectionHeadingWithCountProps) {
  return (
    <h3
      className={cn(
        "text-xl font-bold mb-4 flex items-center gap-2",
        className
      )}
    >
      <span className={`text-${colorClass}-600`}>{icon}</span>
      {title}
      <span
        className={cn(
          `ml-2 bg-${colorClass}-100 text-${colorClass}-800 text-sm font-semibold px-2.5 py-0.5 rounded-full`
        )}
      >
        {count}
      </span>
    </h3>
  );
}
