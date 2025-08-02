import { createBrowserRouter, Navigate } from "react-router-dom";
import Navigation from "./app/navigation";

import ManagementDashboard from "./modules/management/dashboard";

import StudentCatchUp from "./modules/student/catchup";
import StudentAttendence from "./modules/student/attendence";
import StudentGrade from "./modules/student/grade";
import StudentProfile from "./modules/student/profile";
import Assignments from "./modules/student/assignment";
import CurrentCoursesTab from "./modules/placement/placement";
import { ReportListing } from "./modules/report/reportList";
import Report from "./modules/report/report";
import PlacementDetails from "./modules/placement/placementDetails";
import { AdmissionForm } from "./modules/forms/admissionPage";
import { Admission } from "./modules/admission/admission";
import AdmissionInsights from "./modules/admission/admissionInsights";
import { AdmissionReport } from "./modules/admission/admissionReport";
import TeacherDashboard from "./modules/faculty/catchup";
import PlacementDashboard from "./modules/placement/placementDashboard";
import { CompaniesList } from "./modules/placement/companiesList";
import { PlacementCatchupDashboard } from "./modules/placement/catchup";
import ExamsPage from "./modules/exam/examDetails";
import CounsellerCatchUp from "./modules/counseller/counsellerCatchup";
import CounsellerDashboard from "./modules/leads/pages/leadDashboard";
import LeadProfile from "./modules/leads/pages/leadProfie";
import LeadsList from "./modules/leads/pages/leadsList";
import PublicLayout from "./app/publicLayout";
import { ExamStepperLayout } from "./modules/onlineExam/pages/registration";
import { MCQExamPage } from "./modules/onlineExam/pages/MCQExamPage";
import TeacherSlotAvailability from "./modules/faculty/proctoringSlot";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PublicLayout />, // Layout without sidebar
      children: [
        { path: "admission/form", element: <AdmissionForm /> },
        { path: "registration", element: <ExamStepperLayout /> },
        { path: "test", element: <MCQExamPage /> },
      ],
    },
    {
      path: "/",
      element: <Navigation />,
      children: [
        {
          index: true,
          element: <Navigate to="/student/catchup" replace />,
        },
        {
          path: "management",
          children: [
            {
              index: true,
              element: <Navigate to="catchup" replace />,
            },
            { path: "catchup", element: <ManagementDashboard /> },
          ],
        },
        {
          path: "counseller",
          children: [
            {
              index: true,
              element: <Navigate to="catchup" replace />,
            },
            { path: "catchup", element: <CounsellerCatchUp /> },
            { path: "dashboard", element: <CounsellerDashboard /> },
          ],
        },
        {
          path: "leads",
          children: [
            {
              index: true,
              element: <Navigate to="list" replace />,
            },
            { path: "list", element: <LeadsList /> },
            { path: "list/:id", element: <LeadProfile /> },
          ],
        },
        {
          path: "report",
          children: [
            {
              index: true,
              element: <Navigate to="catchup" replace />,
            },
            { path: "list", element: <ReportListing /> },
            { path: "list/:id", element: <Report /> },
          ],
        },
        {
          path: "teacher",
          children: [
            {
              index: true,
              element: <Navigate to="catchup" replace />,
            },
            { path: "catchup", element: <TeacherDashboard /> },
            { path: "slot", element: <TeacherSlotAvailability /> },
          ],
        },
        {
          path: "student",
          children: [
            {
              index: true,
              element: <Navigate to="catchup" replace />,
            },
            { path: "profile", element: <StudentProfile /> },
            { path: "catchup", element: <StudentCatchUp /> },
            { path: "attendence", element: <StudentAttendence /> },
            { path: "grade", element: <StudentGrade /> },
            { path: "assignments", element: <Assignments /> },
          ],
        },
        {
          path: "placement",
          children: [
            {
              index: true,
              element: <Navigate to="catchup" replace />,
            },
            { path: "catchup", element: <PlacementCatchupDashboard /> },
            { path: "list", element: <CurrentCoursesTab /> },
            { path: "list/:id", element: <PlacementDetails /> },
            { path: "dashboard", element: <PlacementDashboard /> },
            { path: "companyList", element: <CompaniesList /> },
          ],
        },
        {
          path: "exam",
          children: [
            {
              index: true,
              element: <Navigate to="details" replace />,
            },
            { path: "details", element: <ExamsPage /> },
          ],
        },
        {
          path: "admission",
          element: <Admission />,
          children: [
            {
              index: true,
              element: <Navigate to="insights" replace />,
            },
            {
              path: "insights",
              element: <AdmissionInsights />,
            },
            {
              path: "report",
              element: <AdmissionReport />,
            },
            // {
            //   path: "*",
            //   element: <Navigate to="insights" replace />,
            // },
          ],
        },
      ],
    },
  ],
  {
    basename: "/edure-FE/", // Add this for GitHub Pages
  }
);
