"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const Needle = ({
  value,
  max,
  cx,
  cy,
  r,
}: {
  value: number;
  max: number;
  cx: number;
  cy: number;
  r: number;
}) => {
  // Angle for the needle (0 value => 180 degrees, max => 0 degrees)
  const angle = 180 - (value / max) * 180;
  const radians = (angle * Math.PI) / 180;
  const needleLength = r * 0.9;

  // Calculate needle end coordinates
  const endX = cx + needleLength * Math.cos(radians);
  const endY = cy - needleLength * Math.sin(radians);

  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 0.05} fill="hsl(var(--primary))" />
      <line
        x1={cx}
        y1={cy}
        x2={endX}
        y2={endY}
        stroke="hsl(var(--primary))"
        strokeWidth={4}
        strokeLinecap="round"
      />
    </g>
  );
};

export function GaugeMeter({
  value = 72,
  max = 100,
}: {
  value?: number;
  max?: number;
}) {
  const gaugeData = [{ value, max }];
  const percentage = Math.round((value / max) * 100);

  // color based on performance
  const getColor = (val: number) => {
    if (val < 30) return "hsl(0, 72%, 51%)"; // red
    if (val < 60) return "hsl(30, 100%, 50%)"; // orange
    if (val < 80) return "hsl(45, 100%, 51%)"; // yellow
    return "hsl(120, 73%, 45%)"; // green
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Performance Gauge</CardTitle>
      </CardHeader>
      <CardContent>
        <div className=" w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              cx="50%"
              cy="100%"
              outerRadius="80%"
              startAngle={180}
              endAngle={0}
              data={gaugeData}
            >
              <PolarGrid
                radialLines={false}
                polarRadius={[0, 0.25, 0.5, 0.75, 1].map(
                  (mult) => mult * 100 // percent of outerRadius
                )}
              />
              <PolarAngleAxis axisLine={false} tick={false} domain={[0, max]} />
              <Radar
                name="Value"
                dataKey="value"
                fill={getColor(percentage)}
                fillOpacity={0.6}
                stroke={getColor(percentage)}
                strokeWidth={10}
              />
              {/* The RadarChart svg viewBox size is 100x100 with cx=50%, cy=100%, outerRadius=80% */}
              {/* So needle cx,cy = 50,100 and r = 80 */}
              <Needle value={value} max={max} cx={50} cy={100} r={80} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <p
            className="text-2xl font-bold"
            style={{ color: getColor(percentage) }}
          >
            {percentage}%
          </p>
          <p className="text-sm text-muted-foreground">
            Current performance ({value}/{max})
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
