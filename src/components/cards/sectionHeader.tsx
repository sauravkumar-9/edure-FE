import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string | ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  className = "",
  titleClassName = "text-2xl font-bold tracking-tight",
  subtitleClassName = "text-muted-foreground",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <div>
        <h1 className={titleClassName}>{title}</h1>
        {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
      </div>
    </div>
  );
}
