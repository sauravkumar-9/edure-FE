import { StatCard } from "@/components/final/statCard";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react"; // or use any preferred icon set

const statCardsData = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: <DollarSign className="text-muted-foreground h-4 w-4" />,
  },
  {
    title: "Subscriptions",
    value: "+2350",
    change: "+180.1% from last month",
    icon: <Users className="text-muted-foreground h-4 w-4" />,
  },
  {
    title: "Sales",
    value: "+12,234",
    change: "+19% from last month",
    icon: <CreditCard className="text-muted-foreground h-4 w-4" />,
  },
  {
    title: "Active Now",
    value: "+573",
    change: "+201 since last hour",
    icon: <Activity className="text-muted-foreground h-4 w-4" />,
  },
];
export default function ReportInsights() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
      {statCardsData.map((stat, idx) => (
        <StatCard
          key={idx}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
