import { Blog, Company, Home } from "~/pages";
export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/company", component: Company },
  { path: "/blog", component: Blog },
];
export const privateRoutes = [];
