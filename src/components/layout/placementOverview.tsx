import { Building2, BarChart2, ClipboardList, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { AccordionSection } from "../comman/accordionSection";
import { Accordion } from "@/components/ui/accordion";

const overviewSectionMockData = [
  {
    id: "about",
    icon: <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    title: "About the Company",
    subtitle: "Overview of the company and its achievements",
    content: (
      <div className="space-y-3">
        <p>
          Founded in 1985, our company is a global leader in IT services and
          digital solutions...
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>10,000+ employees worldwide</li>
          <li>$5.2B annual revenue</li>
          <li>Recognized as "Best Workplace" 3 years running</li>
        </ul>
        <Button
          variant="link"
          size="sm"
          className="px-0 text-blue-600 dark:text-blue-400 hover:no-underline mt-2"
        >
          Read More →
        </Button>
      </div>
    ),
  },
  {
    id: "stats",
    icon: <BarChart2 className="h-5 w-5 text-green-600 dark:text-green-400" />,
    title: "Placement Statistics",
    subtitle: "Current and previous year placement data",
    content: (
      <div className="grid grid-cols-2 gap-4">
        {/* Current Year */}
        <div>
          <h4 className="font-medium text-sm text-gray-500">Current Year</h4>
          <ul className="mt-2 space-y-2">
            <li>
              Offers made: <strong>127</strong>
            </li>
            <li>
              Highest package: <strong>₹42 LPA</strong>
            </li>
            <li>
              Average package: <strong>₹8.5 LPA</strong>
            </li>
          </ul>
        </div>
        {/* Previous Year */}
        <div>
          <h4 className="font-medium text-sm text-gray-500">Previous Year</h4>
          <ul className="mt-2 space-y-2">
            <li>
              Offers made: <strong>98</strong>
            </li>
            <li>
              Highest package: <strong>₹38 LPA</strong>
            </li>
            <li>
              Average package: <strong>₹7.2 LPA</strong>
            </li>
          </ul>
        </div>
        <Button
          variant="link"
          size="sm"
          className="px-0 text-green-600 dark:text-green-400 hover:no-underline mt-2"
        >
          View Detailed Statistics →
        </Button>
      </div>
    ),
  },
  {
    id: "process",
    icon: (
      <ClipboardList className="h-5 w-5 text-purple-600 dark:text-purple-400" />
    ),
    title: "Recruitment Process",
    subtitle: "Step-by-step hiring procedure and timeline",
    content: (
      <div>
        <ol className="list-decimal pl-5 space-y-3">
          <li>Online Application</li>
          <p className="pl-2">
            Submit your resume through our portal by March 15
          </p>
          <li>Aptitude Test</li>
          <p className="pl-2">90-minute online assessment</p>
          <li>Technical Interview</li>
          <p className="pl-2">1-hour session with our engineering team</p>
          <li>HR Discussion</li>
          <p className="pl-2">Final culture fit evaluation</p>
        </ol>
        <Button
          variant="link"
          size="sm"
          className="px-0 text-purple-600 dark:text-purple-400 hover:no-underline mt-2"
        >
          Download Process PDF →
        </Button>
      </div>
    ),
  },
  {
    id: "eligibility",
    icon: (
      <CheckCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
    ),
    title: "Eligibility Criteria",
    subtitle: "Requirements for applying to this position",
    content: (
      <div className="space-y-3">
        {[
          "Minimum 70% aggregate in all semesters",
          "No active backlogs",
          "Strong fundamentals in Data Structures & Algorithms",
          "Good communication skills",
        ].map((item, i) => (
          <div key={i} className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
            <p className="ml-2">{item}</p>
          </div>
        ))}
        <Button
          variant="link"
          size="sm"
          className="px-0 text-orange-600 dark:text-orange-400 hover:no-underline mt-2"
        >
          Check Your Eligibility →
        </Button>
      </div>
    ),
  },
];

export default function PlacementOverview() {
  const overviewSection = overviewSectionMockData;

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible={true} className="space-y-4">
        {overviewSection.map((section) => (
          <AccordionSection
            key={section.id}
            id={section.id}
            icon={section.icon}
            title={section.title}
            subtitle={section.subtitle}
            content={section.content}
          />
        ))}
      </Accordion>
    </div>
  );
}
