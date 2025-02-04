import { Blog, Companies, Home, AuthPage, JobDetailPage,CompanyDetailPage} from "~/pages";
export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/company", component: Companies },
  { path: "/blog", component: Blog },
  { path: "/auth-page", component: AuthPage },
  { path: "/job/:id", component: JobDetailPage },
  { path: "/company/:id", component: CompanyDetailPage }


];
export const privateRoutes = [];
 