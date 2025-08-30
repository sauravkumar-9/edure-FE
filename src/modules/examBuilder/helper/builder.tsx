import { JSX } from "react";

interface MetricCard {
  id?: string;
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any> | JSX.Element;
}

// Conversion function
export function convertMetricCard(metrics: MetricCard[]) {
  const resulet = metrics.map((card: MetricCard) => {
    return {
      title: card.title,
      value: card.value,
      change: card.change,
      icon:
        typeof card.icon === "function" ? (
          <card.icon className="text-muted-foreground h-4 w-4" />
        ) : (
          card.icon
        ),
      ...(card.id && { id: card.id }), // Preserve id if it exists
    };
  });
  return resulet;
}
