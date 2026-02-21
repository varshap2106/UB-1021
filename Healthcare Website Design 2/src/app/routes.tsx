import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AssessmentPage } from "./pages/AssessmentPage";
import { GuidancePage } from "./pages/GuidancePage";
import { EmergencyPage } from "./pages/EmergencyPage";
import { EducationPage } from "./pages/EducationPage";
import { ProfilePage } from "./pages/ProfilePage";
import { HealthHistory } from "./pages/HealthHistory"; // Add this import

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/assessment",
    Component: AssessmentPage,
  },
  {
    path: "/guidance",
    Component: GuidancePage,
  },
  {
    path: "/emergency",
    Component: EmergencyPage,
  },
  {
    path: "/education",
    Component: EducationPage,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
  {
    path: "/history",          // Add this new route
    Component: HealthHistory,
  },
]);