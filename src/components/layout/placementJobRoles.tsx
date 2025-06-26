import { Code, Smartphone, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { JobOpeningsBanner } from "../cards/jobOpeningBanner";
import { AccordionSection } from "../final/accordionSection";
import { Accordion } from "@/components/ui/accordion";

const jobRolesMockData = [
  {
    id: "sde",
    title: "Software Development Engineer",
    icon: <Code className="h-5 w-5 text-blue-600" />,
    experience: "0-3 years",
    locations: ["Bangalore", "Hyderabad", "Pune"],
    description: [
      "Design, develop, test, and maintain software applications",
      "Collaborate with cross-functional teams to define and ship new features",
      "Write clean, scalable, and well-documented code",
      "Participate in code reviews and provide constructive feedback",
      "Troubleshoot and debug applications",
    ],
    skills: ["DSA", "OOP", "Java/Python/C++", "System Design"],
  },
  {
    id: "uiux",
    title: "UI/UX Designer",
    icon: <Smartphone className="h-5 w-5 text-pink-600" />,
    experience: "1-4 years",
    locations: ["Remote", "Gurugram"],
    description: [
      "Design intuitive and visually appealing user interfaces",
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with product managers and developers",
      "Ensure design consistency across platforms",
    ],
    skills: ["Figma", "Adobe XD", "User Research", "Interaction Design"],
  },
  {
    id: "qa",
    title: "QA Engineer",
    icon: <Settings className="h-5 w-5 text-yellow-600" />,
    experience: "2-5 years",
    locations: ["Mumbai", "Pune"],
    description: [
      "Develop and execute test plans and test cases",
      "Identify, record, and track bugs using tools like JIRA",
      "Perform manual and automated testing",
      "Collaborate with developers to ensure quality releases",
      "Participate in sprint planning and reviews",
    ],
    skills: ["Selenium", "Jest", "Cypress", "Test Automation"],
  },
];

export default function JobRoles() {
  const jobRoles = jobRolesMockData; // Mock data used here

  const items = jobRoles.map((role) => ({
    id: role.id,
    icon: role.icon,
    title: role.title,
    subtitle: `${role.experience} experience • ${role.locations.join(", ")}`,
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Job Description:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {role.description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Key Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {role.skills.map((skill, i) => (
              <span
                key={i}
                className="text-xs bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-sm text-gray-600">
            Application deadline: Rolling basis
          </span>
          <Button variant="outline" size="sm">
            Apply Now
          </Button>
        </div>
      </div>
    ),
  }));

  return (
    <div className="space-y-4">
      <JobOpeningsBanner />

      <Accordion type="single" collapsible={true} className="space-y-4">
        {items.map((section) => (
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
