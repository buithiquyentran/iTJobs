import createApiClient from './api.service';

class JobService {
    constructor(baseUrl = '/api/tin-tuyen-dung') {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get('/status')).data;
    }
    async create(data) {
        return (await this.api.post('/', data)).data;
    }
    async deleteAll() {
        return (await this.api.delete('/')).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async getSuggested(id) {
        return (await this.api.get(`goi-y/${id}`)).data;
    }
    async getSuggestedCaNhan(id) {
        return (await this.api.get(`goi-y-ca-nhan/${id}`)).data;
    }
}

export default new JobService();
