import {
  Employers,
  Recruitments,
  Employees,
  Categories,
  Statistic,
} from "~/pages";

export const publicRoutes = [
  { path: "/", component: Employers },
  { path: "/recruitment-news", component: Recruitments },
  { path: "/employees", component: Employees },
  { path: "/categories", component: Categories },

  { path: "/statistic", component: Statistic },
];

export const privateRoutes = [];
