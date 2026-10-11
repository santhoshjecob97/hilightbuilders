import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Metadata } from "./components/Metadata";
import { ConsentNotice } from "./components/ConsentNotice";
import Home from "./pages/Home";

const AboutPage = lazy(() =>
  import("./pages/SitePages").then(m => ({ default: m.AboutPage }))
);
const AdminPage = lazy(() =>
  import("./pages/SitePages").then(m => ({ default: m.AdminPage }))
);
const ConstructionPage = lazy(() =>
  import("./pages/SitePages").then(m => ({ default: m.ConstructionPage }))
);
const ContactPage = lazy(() =>
  import("./pages/SitePages").then(m => ({ default: m.ContactPage }))
);
const CommercialPage = lazy(() =>
  import("./pages/SitePages").then(m => ({ default: m.CommercialPage }))
);
const InsightsPage = lazy(() =>
  import("./pages/SitePages").then(m => ({ default: m.InsightsPage }))
);
const InsightArticlePage = lazy(() =>
  import("./pages/SitePages").then(m => ({ default: m.InsightArticlePage }))
);
const LegalPage = lazy(() =>
  import("./pages/SitePages").then(m => ({ default: m.LegalPage }))
);
const NotFoundPage = lazy(() =>
  import("./pages/SitePages").then(m => ({ default: m.NotFoundPage }))
);
const ProcessPage = lazy(() =>
  import("./pages/SitePages").then(m => ({ default: m.ProcessPage }))
);
const ProjectsPage = lazy(() =>
  import("./pages/SitePages").then(m => ({ default: m.ProjectsPage }))
);
const ResidentialPage = lazy(() =>
  import("./pages/SitePages").then(m => ({ default: m.ResidentialPage }))
);

function Router() {
  return (
    <>
      <Metadata />
      <Suspense
        fallback={
          <div className="route-loading" role="status">
            Loading page…
          </div>
        }
      >
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/residential" component={ResidentialPage} />
          <Route path="/commercial" component={CommercialPage} />
          <Route path="/construction" component={ConstructionPage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/process" component={ProcessPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/insights" component={InsightsPage} />
          <Route path="/insights/:slug" component={InsightArticlePage} />
          <Route path="/privacy">
            <LegalPage page="privacy" />
          </Route>
          <Route path="/terms">
            <LegalPage page="terms" />
          </Route>
          <Route path="/consent">
            <LegalPage page="consent" />
          </Route>
          <Route path="/cookies">
            <LegalPage page="cookies" />
          </Route>
          <Route path="/admin" component={AdminPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
      <ConsentNotice />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
