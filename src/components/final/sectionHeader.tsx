import { BarChart2, Filter, Search } from "lucide-react";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title?: string;
  description?: string;
  features?: {
    icon: ReactNode;
    text: string;
  }[];
  imageUrl?: string;
  imageAlt?: string;
  actionElement?: ReactNode;
  className?: string;
  containerClass?: string;
  imageClass?: string;
}

export function SectionHeader({
  title = "Institutional Reports",
  features = [
    {
      icon: <Search className="h-4 w-4 text-blue-600" />,
      text: "Find key metrics instantly",
    },
    {
      icon: <Filter className="h-4 w-4 text-indigo-600" />,
      text: "Filter to what matters",
    },
    {
      icon: <BarChart2 className="h-4 w-4 text-purple-600" />,
      text: "Data-driven decisions",
    },
  ],
  imageUrl,
  imageAlt = "Analytics illustration",
  actionElement,
  className = "bg-gradient-to-br from-white via-indigo-50 to-indigo-100",
  containerClass = "rounded-lg border border-indigo-200 shadow-md shadow-indigo-200/30",
  imageClass = "h-full max-h-50 object-contain",
}: SectionHeaderProps) {
  return (
    <div className={`${containerClass} ${className} flex flex-col md:flex-row`}>
      <div className="flex-1 p-5 md:p-6">
        <div className="space-y-3">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">
            {title}
          </h3>

          <p className="text-gray-700 mb-4">
            All reports, insights, and analytics—unified.
            <br />
            Leverage smart search and dynamic filters to instantly surface the
            data you need.
          </p>

          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5">{feature.icon}</span>
                <span className="text-sm text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>

          {actionElement && <div className="pt-3">{actionElement}</div>}
        </div>
      </div>

      {imageUrl && (
        <div className="md:w-2/5 flex items-center justify-center p-4">
          <img src={imageUrl} alt={imageAlt} className={imageClass} />
        </div>
      )}
    </div>
  );
}
