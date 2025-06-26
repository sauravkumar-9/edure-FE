export const roleBasedReports: any = {
  // Reports accessible to all roles
  common: [
    {
      id: "1",
      title: "Student Performance Report",
      description: "Insights into academic performance across all grades.",
      category: ["Academics", "Performance"],
      tag: "STUDENT_PERFORMANCE",
    },
  ],

  // Teacher-specific reports
  teacher: [
  ],

  // Management-specific reports
  management: [
    {
      id: "2",
      title: "Fees Collection Report",
      description: "Overview of pending and received fee payments.",
      category: ["Finance", "Payments"],
      tag: "FEES_COLLECTION",
    },
    {
      id: "3",
      title: "Placement Statistics",
      description: "Company-wise placement statistics and trends.",
      category: ["Placement", "Career"],
      tag: "PLACEMENT_STATS",
    },
    {
      id: "4",
      title: "Admission Report",
      description: "Detailed insights into student admissions, statuses, and trends.",
      category: ["Admission", "Enrollment"],
      tag: "ADMISSION",
    },
    {
      id: "5",
      title: "College Expense Report",
      description: "Comprehensive breakdown of institutional expenses including salaries, utilities, infrastructure, and miscellaneous costs.",
      category: ["Finance", "Expenditure"],
      tag: "COLLEGE_EXPENSE"
    },
    {
      id: "6",
      title: "Faculty Performance Report",
      description: "Detailed insights into teacher attendance, class engagement, subject-wise distribution, and student feedback.",
      category: ["Academics", "Faculty"],
      tag: "TEACHER_PERFORMANCE"
    },
    {
      id: "7",
      title: "Company-wise Placement Statistics",
      description: "In-depth analysis of student placements across companies, including offer counts, salary ranges, and department-wise distribution.",
      category: ["Placement", "Career"],
      tag: "COMPANY_PLACEMENT_STATS"
    }
    
  ],

  // Placement-specific reports
  placement: [
    {
      id: "3",
      title: "Placement Statistics",
      description: "Company-wise placement statistics and trends.",
      category: ["Placement", "Career"],
      tag: "PLACEMENT_STATS",
    },
  ],
};


// Type definition
export type RoleBasedReports = {
  [role: string]: {
    id: string;
    title: string;
    description: string;
    category: string[];
  }[];
};

