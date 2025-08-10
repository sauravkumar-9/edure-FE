import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useState } from "react";
import { StatCard } from "@/components/final/statCard";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react"; // or use any preferred icon set
import { PieChartDonut } from "@/components/charts/pieChartDonut";
import { CustomLineChart } from "@/components/charts/lineChart";
import { CustomBarChart } from "@/components/charts/barChart";
import { ReportHeader } from "@/components/final/reportHeader";

// Mock data - replace with your actual data
const departments = [
  "All Department",
  "Computer Science",
  "Electrical",
  "Mechanical",
  "Civil",
  "MBA",
  "Computer Science",
  "Electrical",
  "Mechanical",
  "Civil",
  "MBA",
  "Computer Science",
  "Electrical",
  "Mechanical",
  "Civil",
  "MBA",
];
const academicYears = [
  "2005-06",
  "2006-07",
  "2007-08",
  "2008-09",
  "2009-10",
  "2010-11",
  "2011-12",
  "2012-13",
  "2013-14",
  "2014-15",
  "2015-16",
  "2016-17",
  "2017-18",
  "2018-19",
  "2019-20",
  "2020-21",
  "2021-22",
  "2022-23",
  "2023-24",
  "2024-25",
];

const currentYear = new Date().getFullYear();

export const statCardsData = [
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

export default function AdmissionInsights() {
  // State for filters
  const [department, setDepartment] = useState(departments[0]);
  const [selectedYear] = useState(academicYears[0]);
  const [timeRange, setTimeRange] = useState("current_year");
  console.log(timeRange);

  return (
    <div className="space-y-6">
      <ReportHeader
        title="Admission Dashboard"
        description={`Overview of ${currentYear} admission statistics`}
        filters={[
          {
            options: departments,
            value: department,
            onChange: setDepartment,
            placeholder: "Select department",
          },
          {
            options: academicYears,
            value: selectedYear,
            onChange: setTimeRange,
            placeholder: "Select year",
          },
        ]}
      />

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">By Department</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <CustomLineChart />

            <PieChartDonut />
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <CustomBarChart
            title="Subject-wise Attendance"
            description="Attendance percentage by subject"
            data={[
              { name: "Math", value: 85 },
              { name: "Science", value: 78 },
              { name: "English", value: 90 },
              { name: "History", value: 70 },
              { name: "Geography", value: 88 },
            ]}
            metricName="Points"
            metricColor="#8B5CF6" // Purple
            peakValue={22}
            peakMonth="Week 2"
          />
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <PieChartDonut />
            <PieChartDonut />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
