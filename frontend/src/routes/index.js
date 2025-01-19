import { Blog, Companies, Home, AuthPage} from "~/pages";
export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/company", component: Companies },
  { path: "/blog", component: Blog },
  { path: "/auth-page", component: AuthPage },

];
export const privateRoutes = [];
