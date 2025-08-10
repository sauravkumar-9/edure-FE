import { toast } from "sonner";
import { CircleCheck, Info, XCircle, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function showToast({
  title,
  description,
  type,
}: {
  title: string;
  description: string;
  type: "success" | "error" | "info" | "warning";
}) {
  const iconMap = {
    success: {
      icon: <CircleCheck className="h-4 w-4 text-green-600" />,
      ring: "bg-green-100",
    },
    error: {
      icon: <XCircle className="h-4 w-4 text-red-600" />,
      ring: "bg-red-100",
    },
    info: {
      icon: <Info className="h-4 w-4 text-blue-600" />,
      ring: "bg-blue-100",
    },
    warning: {
      icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
      ring: "bg-yellow-100",
    },
  };

  const { icon, ring } = iconMap[type];

  toast.custom((t: any) => (
    <div
      className={cn(
        "relative flex items-start gap-4 py-5 px-4 w-full max-w-sm rounded-xl border bg-white shadow-md",
        t ? "animate-in fade-in" : "animate-out fade-out"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex items-center justify-center rounded-full p-2",
          ring
        )}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="space-y-1 flex-1">
        <h4 className="font-semibold text-sm text-gray-900 leading-tight">
          {title}
        </h4>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>

      {/* Close Button */}
      <button
        onClick={() => toast.dismiss(t.id)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  ));
}
