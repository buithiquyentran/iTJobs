import {
    Blog,
    Companies,
    Jobs,
    AuthPage,
    JobDetailPage,
    CompanyDetailPage,
    AccountPage,
    ManageCVPage,
    AppliedJobPage,
    SaveJobPage,
    FollowingCompanyPage,
    CVPreview,
    HomePage,
} from '~/UserDashBoard/Pages';
import {
    EmployerHome,
    MyCompany,
    MyRecruiments,
    MyCandidates,
    Statistics,
    MyHistory,
    Support,
} from '~/EmployerDashBoard/Pages';
export const UserDashBoardRoutes = [
    { path: '/', component: HomePage },
    { path: '/jobs', component: Jobs },
    { path: '/company', component: Companies },
    { path: '/blog', component: Blog },
    { path: '/auth-page', component: AuthPage },
    { path: '/job/:id', component: JobDetailPage },
    { path: '/company/:id', component: CompanyDetailPage },
    { path: '/user/view-cv/', component: CVPreview },
    { path: '/user/view-cv/:id', component: CVPreview },

    { text: 'Tài khoản', path: '/settings/account', component: AccountPage },
    { text: 'Quản lí CV', path: '/settings/manage-cv', component: ManageCVPage },
    { text: 'Việc đã ứng tuyển', path: '/settings/applied-jobs', component: AppliedJobPage },
    { text: 'Việc đã lưu', path: '/settings/saved-jobs', component: SaveJobPage },
    { text: 'Công ty theo dõi', path: '/settings/following-companies', component: FollowingCompanyPage },
];

export const EmployerDashBoardRoutes = [
    { path: '/', component: EmployerHome },
    { path: '/my-company', component: MyCompany },
    { path: '/my-recruiments', component: MyRecruiments },
    { path: '/my-candidates', component: MyCandidates },
    { path: '/statistics', component: Statistics },
    { path: '/my-history', component: MyHistory },
    { path: '/support', component: Support },
    { path: '/user/view-cv/:id', component: CVPreview },
];
