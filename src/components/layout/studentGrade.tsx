import { GaugeMeter } from "../charts/gageMeter";

interface StudentGradeProps {
  gauge: {
    value: number;
    size?: "sm" | "md" | "lg";
    label?: string;
  };
}

export default function StudentGrade({}: StudentGradeProps) {
  return (
    <div className="flex justify-center">
      <GaugeMeter value={65} max={100} />
    </div>
  );
}
