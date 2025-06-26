import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface AttendanceSummaryCardProps {
  actual: number; // e.g. 60
  regularized: number; // e.g. 12
}
const highRegularizedSubjects = [
  { name: "Mathematics", percentage: 40 },
  { name: "Physics", percentage: 35 },
  { name: "Chemistry", percentage: 32 },
];

export const AttendanceSummaryCard = ({
  actual,
  regularized,
}: AttendanceSummaryCardProps) => {
  const total = actual + regularized;
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({
        width: `${total}%`,
        transition: { duration: 1, ease: "easeOut" },
      });
    }
  }, [isInView, controls, total]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Attendance Summary</CardTitle>
        <CardDescription>Breakdown of Actual vs Regularized</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div ref={ref}>
          <div className="flex justify-between text-sm font-medium mb-1">
            <span>Total Attendance</span>
            <span>{total}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-200 relative overflow-hidden">
            {/* Actual Attendance - Animated */}
            <motion.div
              className="absolute left-0 top-0 h-full bg-green-300 rounded-l-full"
              initial={{ width: 0 }}
              animate={{ width: `${actual}%` }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            />

            {/* Regularized Attendance - Animated */}
            <motion.div
              className="absolute left-0 top-0 h-full bg-blue-300"
              initial={{ width: 0 }}
              animate={{
                width: `${total}%`,
                clipPath: `inset(0 ${100 - total}% 0 ${actual}%)`,
              }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {actual}% actual + {regularized}% regularized
          </div>
        </div>

        {/* Subjects with High Regularization */}
        <div>
          <h4 className="text-sm font-semibold mb-2">
            Subjects with High Regularizations
          </h4>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {highRegularizedSubjects.map((subject) => (
              <div
                key={subject.name}
                className="rounded-full bg-gray-100 px-3 py-1 flex items-center gap-1"
              >
                <span className="font-medium text-gray-700">
                  {subject.name}
                </span>
                <span className="text-xs text-gray-500">
                  ({subject.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground">
        Regularized attendance includes approved leaves and special cases.
      </CardFooter>
    </Card>
  );
};
