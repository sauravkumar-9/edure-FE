import { ReactNode } from "react";
import { Info } from "lucide-react";

interface PageInfoProps {
  title: string;
  description: string;
  icon?: ReactNode;
  variant?: "blue" | "gray" | "green" | "yellow" | "purple" | "red";
  className?: string;
}

export default function PageInfo({
  title,
  description,
  icon,
  variant = "blue",
  className = "",
}: PageInfoProps) {
  // Variant styles
  const variantStyles = {
    blue: {
      container: "bg-blue-50 border-blue-200",
      iconContainer: "bg-blue-100 text-blue-600",
      title: "text-blue-800",
      description: "text-blue-700",
    },
    red: {
      container: "bg-red-50 border-red-200",
      iconContainer: "bg-red-100 text-red-600",
      title: "text-red-800",
      description: "text-red-700",
    },
    gray: {
      container: "bg-gray-50 border-gray-200",
      iconContainer: "bg-gray-100 text-gray-600",
      title: "text-gray-800",
      description: "text-gray-700",
    },
    green: {
      container: "bg-green-50 border-green-200",
      iconContainer: "bg-green-100 text-green-600",
      title: "text-green-800",
      description: "text-green-700",
    },
    yellow: {
      container: "bg-yellow-50 border-yellow-200",
      iconContainer: "bg-yellow-100 text-yellow-600",
      title: "text-yellow-800",
      description: "text-yellow-700",
    },
    purple: {
      container: "bg-purple-50 border-purple-200",
      iconContainer: "bg-purple-100 text-purple-600",
      title: "text-purple-800",
      description: "text-purple-700",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={`border rounded-lg p-4 ${styles.container} ${className}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${styles.iconContainer}`}>
          {icon || <Info className="h-5 w-5" />}
        </div>
        <div className="flex-1">
          <h3 className={`font-medium mb-1 ${styles.title}`}>{title}</h3>
          <p className={`text-sm ${styles.description}`}>{description}</p>
        </div>
      </div>
    </div>
  );
}
