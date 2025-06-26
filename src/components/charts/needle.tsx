"use client";

const Needle = ({
  value,
  max,
  cx,
  cy,
  r,
}: {
  value: number;
  max: number;
  cx: number | string;
  cy: number | string;
  r: number;
}) => {
  const angle = 180 - (value / max) * 180; // Convert value to angle (0-180°)
  const radian = (angle * Math.PI) / 180;
  const needleLength = r * 0.85;
  const endX = Number(cx) + needleLength * Math.cos(radian);
  const endY = Number(cy) - needleLength * Math.sin(radian);

  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill="hsl(var(--foreground))" />
      <line
        x1={cx}
        y1={cy}
        x2={endX}
        y2={endY}
        stroke="hsl(var(--foreground))"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </g>
  );
};

export default Needle;
