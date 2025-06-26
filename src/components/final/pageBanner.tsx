import { ReactNode } from "react";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  textClassName?: string;
  subtitleClassName?: string;
  iconContainerClassName?: string;
}

export function PageBanner({
  title,
  subtitle,
  icon,
  className = "",
  textClassName = "text-gray-800",
  subtitleClassName = "text-muted-foreground mt-1",
  iconContainerClassName = "hidden sm:flex items-center justify-center",
}: PageBannerProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 p-6 shadow mb-4 ${className}`}
    >
      {/* Left Text */}
      <div>
        <h1 className={`text-2xl font-bold ${textClassName}`}>{title}</h1>
        {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
      </div>

      {/* Right Icon */}
      {icon && <div className={iconContainerClassName}>{icon}</div>}
    </div>
  );
}
