import createApiClient from './api.service';

class AuthService {
    constructor(baseUrl = 'api/auth-page') {
        this.api = createApiClient(baseUrl);
    }
    async Login(data) {
        return (await this.api.post('/login', data)).data;
    }
    async Logout() {
        return (await this.api.post('/logout')).data;
    }
    async RegisterEmployee(data) {
        return (await this.api.post('/register-employee', data)).data;
    }
    async RegisterEmployer(data) {
        return (await this.api.post('/register-employer', data)).data;
    }


    async getUserInfo() {
        return (
            await this.api.get('http://localhost:5173/api/auth-page/user-info', {
                withCredentials: true,
            })
        ).data;
    }
}

export default new AuthService();
