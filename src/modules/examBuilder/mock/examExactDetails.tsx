import { Users, UserCog, Ratio } from "lucide-react";

export default {
  examID: "123",
  examStatus: "Upcoming",
  stats: [
    {
      title: "Total Candidates",
      value: 120,
      change: "Candidates registered for this exam",
      icon: <Users className="text-indigo-600 h-5 w-5" />,
    },
    {
      title: "Total Proctors",
      value: 8,
      change: "Proctors available for invigilation",
      icon: <UserCog className="text-green-600 h-5 w-5" />,
    },
    {
      title: "Candidate-Proctor Ratio",
      value: "7:1",
      change: "Recommended ratio is 4:1(For every 4 student 1 proctor)",
      icon: <Ratio className="text-orange-600 h-5 w-5" />,
    },
  ],
  status: [
    {
      label: "Question Paper",
      status: "Pending",
    },
    {
      label: "Answer Key",
      status: "Pending",
    },
    {
      label: "Exam",
      status: "Scheduled",
    },
    {
      label: "Result Calculated",
      status: "Pending",
    },
  ],
};
