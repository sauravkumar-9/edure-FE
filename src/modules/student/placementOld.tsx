import React from "react";
import { CourseCard } from "@/components/cards/placementCard";
import { Course } from "@/types/student";

export const CurrentCoursesTab: React.FC = () => {
  // Sample courses data
  const courses: Course[] = [
    {
      id: "1",
      title: "Business Management and Leadership",
      enrollmentId: "SOH-BML-324",
      status: "In Progress",
      expiringIn: "72 Days",
      completionPercentage: 68,
      imageSrc:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "2",
      title: "Full Stack Development",
      enrollmentId: "SOH-FSD-264",
      status: "Pending",
      expiringIn: "92 Days",
      completionPercentage: 0,
      imageSrc:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "3",
      title: "Health Insurance and Reimursement",
      enrollmentId: "SOH-HIR-166",
      status: "Completed",
      expiringIn: "2 Days",
      completionPercentage: 100,
      imageSrc:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Current Courses</h2>
      <div className="space-y-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
