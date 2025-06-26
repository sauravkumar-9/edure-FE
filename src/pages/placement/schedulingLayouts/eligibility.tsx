import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function Eligibility() {
  const [allowedBatches, setAllowedBatches] = useState<string[]>([]);
  const [allowedYears, setAllowedYears] = useState<string[]>([]);
  const [eligibilityCGPA, setEligibilityCGPA] = useState("");
  const [eligibilityPercentage, setEligibilityPercentage] = useState("");

  const handleBatchToggle = (batch: string) => {
    setAllowedBatches((prev) =>
      prev.includes(batch) ? prev.filter((b) => b !== batch) : [...prev, batch]
    );
  };

  const handleYearToggle = (year: string) => {
    setAllowedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="font-medium">Allowed Batches</Label>
        <div className="flex flex-wrap gap-4 mt-3">
          {["CSE", "ECE", "EEE", "MECH", "CIVIL"].map((batch) => (
            <div key={batch} className="flex items-center space-x-2">
              <Checkbox
                id={`batch-${batch}`}
                checked={allowedBatches.includes(batch)}
                onCheckedChange={() => handleBatchToggle(batch)}
              />
              <Label htmlFor={`batch-${batch}`}>{batch}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="font-medium">Allowed Years</Label>
        <div className="flex flex-wrap gap-4 mt-3">
          {["2023", "2024", "2025"].map((year) => (
            <div key={year} className="flex items-center space-x-2">
              <Checkbox
                id={`year-${year}`}
                checked={allowedYears.includes(year)}
                onCheckedChange={() => handleYearToggle(year)}
              />
              <Label htmlFor={`year-${year}`}>{year}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Minimum CGPA</Label>
          <Input
            placeholder="e.g., 7.5"
            value={eligibilityCGPA}
            onChange={(e) => setEligibilityCGPA(e.target.value)}
            type="number"
            min="0"
            max="10"
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <Label>Minimum Percentage</Label>
          <Input
            placeholder="e.g., 75%"
            value={eligibilityPercentage}
            onChange={(e) => setEligibilityPercentage(e.target.value)}
            type="number"
            min="0"
            max="100"
          />
        </div>
      </div>
    </div>
  );
}
