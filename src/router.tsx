import { createBrowserRouter, Navigate } from "react-router-dom";
import Navigation from "./app/navigation";

import ManagementDashboard from "./pages/management/dashboard";

import StudentCatchUp from "./pages/student/catchup";
import StudentAttendence from "./pages/student/attendence";
import StudentGrade from "./pages/student/grade";
import StudentProfile from "./pages/student/profile";
import Assignments from "./pages/student/assignment";
import CurrentCoursesTab from "./pages/placement/placement";
import { ReportListing } from "./pages/report/reportList";
import Report from "./pages/report/report";
import PlacementDetails from "./pages/placement/placementDetails";
import { AdmissionForm } from "./pages/forms/admissionPage";
import { Admission } from "./pages/admission/admission";
import AdmissionInsights from "./pages/admission/admissionInsights";
import { AdmissionReport } from "./pages/admission/admissionReport";
import TeacherDashboard from "./pages/faculty/catchup";
import PlacementDashboard from "./pages/placement/placementDashboard";
import { CompaniesList } from "./pages/placement/companiesList";
import { PlacementCatchupDashboard } from "./pages/placement/catchup";
import ExamsPage from "./pages/exam/examDetails";

export const router = createBrowserRouter(
  [
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
    { path: "/admission/form", element: <AdmissionForm /> },
  ],
  {
    basename: "/ed-tech/", // Add this for GitHub Pages
  }
);
