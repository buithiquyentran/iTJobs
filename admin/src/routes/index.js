import {
  Employers,
  Recruitments,
  Employees,
  Categories,
  Statistic,
} from "~/pages";

export const privateRoutes = [
  { path: "/", component: Employers },
  { path: "/recruitment-news", component: Recruitments },
  { path: "/employees", component: Employees },
  { path: "/categories", component: Categories },
  { path: "/statistic", component: Statistic },
];

