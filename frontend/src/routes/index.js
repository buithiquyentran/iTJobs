import {
    Blog,
    Companies,
    Home,
    AuthPage,
    JobDetailPage,
    CompanyDetailPage,
    AccountPage,
    ManageCVPage,
    AppliedJobPage,
    SaveJobPage,
    FollowingCompanyPage,
    CVPreview,
} from '~/pages';
export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/company', component: Companies },
    { path: '/blog', component: Blog },
    { path: '/auth-page', component: AuthPage },
    { path: '/job/:id', component: JobDetailPage },
    { path: '/company/:id', component: CompanyDetailPage },
    { path: '/user/view-cv', component: CVPreview },

    { text: 'Tài khoản', path: '/account', component: AccountPage },
    { text: 'Quản lí CV', path: '/manage-cv', component: ManageCVPage },
    { text: 'Việc đã ứng tuyển', path: '/applied-jobs', component: AppliedJobPage },
    { text: 'Việc đã lưu', path: '/saved-jobs', component: SaveJobPage },
    { text: 'Công ty theo dõi', path: '/following-companies', component: FollowingCompanyPage },
];
export const privateRoutes = [];
