"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Student attendance radial chart";

const attendanceData = [
  {
    month: "January",
    present: 22,
    absent: 3,
    percentage: 88, // (22/25)*100
  },
];

const chartConfig = {
  present: {
    label: "Present",
    color: "var(--chart-1)",
  },
  absent: {
    label: "Absent",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartRadialStacked() {
  const currentMonth = attendanceData[0];
  const totalClasses = currentMonth.present + currentMonth.absent;
  const attendancePercentage = currentMonth.percentage;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Student Attendance</CardTitle>
        <CardDescription>2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full max-w-[250px] h-[120px] overflow-hidden"
        >
          <RadialBarChart
            data={attendanceData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis
              tick={false}
              tickLine={false}
              axisLine={false}
              className="translate-y-[35px]"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className={`text-2xl font-bold ${
                            attendancePercentage >= 75
                              ? "fill-green-600"
                              : "fill-red-600"
                          }`}
                        >
                          {attendancePercentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Overall Attendance
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="present"
              stackId="a"
              cornerRadius={5}
              fill={attendancePercentage >= 75 ? "#86efac" : "#fca5a5"} // light green/light red
              className="stroke-transparent stroke-2 translate-y-[35px]"
            />
            <RadialBar
              dataKey="absent"
              fill={attendancePercentage >= 75 ? "#fecaca" : "#f87171"} // lighter red/medium red
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2 translate-y-[35px]"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div
          className={`flex items-center gap-2 leading-none font-medium ${
            attendancePercentage >= 75 ? "text-green-600" : "text-red-600"
          }`}
        >
          {attendancePercentage >= 75 ? "Good attendance" : "Needs improvement"}
          {attendancePercentage >= 75 ? (
            <TrendingUp className="h-4 w-4" />
          ) : null}
        </div>
        <div className="text-muted-foreground leading-none">
          {currentMonth.present} present out of {totalClasses} classes
        </div>
      </CardFooter>
    </Card>
  );
}
