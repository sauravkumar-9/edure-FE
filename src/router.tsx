import { createBrowserRouter, Navigate } from "react-router-dom";
import Navigation from "./app/navigation";

import CurrentCoursesTab from "./modules/placement/pages/placement";
import { ReportListing } from "./modules/report/reportList";
import Report from "./modules/report/report";
import PlacementDetails from "./modules/placement/pages/placementDetails";
import { AdmissionForm } from "./modules/forms/admissionPage";
import TeacherDashboard from "./modules/faculty/pages/catchup";
import PlacementDashboard from "./modules/placement/pages/placementDashboard";
import { CompaniesList } from "./modules/placement/pages/companiesList";
import { PlacementCatchupDashboard } from "./modules/placement/pages/catchup";
import CounsellerDashboard from "./modules/leads/pages/leadDashboard";
import LeadProfile from "./modules/leads/pages/leadProfie";
import LeadsList from "./modules/leads/pages/leadsList";
import PublicLayout from "./app/publicLayout";
import { ExamStepperLayout } from "./modules/exam/pages/registration";
import { MCQExamPage } from "./modules/exam/pages/MCQExamPage";
import QuestionBank from "./modules/questionBank/pages/questionBank";
import ExamScheduleList from "./modules/examBuilder/pages/examScheduleList";
import ExamDetails from "./modules/examBuilder/pages/examDetails";
import ExamCategoryList from "./modules/examBuilder/pages/examCategoryList";

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
          element: <Navigate to="/teacher/catchup" replace />,
        },
        {
          path: "management",
          children: [
            {
              index: true,
              element: <Navigate to="catchup" replace />,
            },
            { path: "catchup", element: "" },
          ],
        },
        {
          path: "counseller",
          children: [
            {
              index: true,
              element: <Navigate to="catchup" replace />,
            },
            { path: "catchup", element: "" },
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
          ],
        },
        {
          path: "exam",
          children: [
            {
              index: true,
              element: <Navigate to="category" replace />,
            },
            { path: "category/:categoryId", element: <ExamScheduleList /> },
            { path: "category/:categoryId/:examId", element: <ExamDetails /> },
            { path: "category", element: <ExamCategoryList /> },
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
          path: "questions",
          children: [
            {
              index: true,
              element: <Navigate to="list" replace />,
            },
            { path: "exams/:categoryId", element: <QuestionBank /> },
          ],
        },
      ],
    },
  ],
  {
    basename: "/edure-FE/", // Add this for GitHub Pages
  }
);
