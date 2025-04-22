import createApiClient from './api.service';

class FollowService {
    constructor(baseUrl = '/api/follow') {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get('/')).data;
    }
    async create(data) {
        return (await this.api.post('/', data)).data;
    }
    // async deleteAll() {
    //     return (await this.api.delete('/')).data;
    // }
    async get(maNld, maNtd) {
        return (await this.api.get(`/${maNld}/${maNtd}`)).data;
    }
    async getByMA_NLD(maNld) {
        return (await this.api.get(`/ma-nld/${maNld}`)).data;
    }
    async getByMA_NTD(maNtd) {
        return (await this.api.get(`/ma-ntd/${maNtd}`)).data;
    }
    // async update(id, data) {
    //     return (await this.api.put(`/${id}`, data)).data;
    // }
    async delete(maNld, maNtd) {
        return (await this.api.delete(`/${maNld}/${maNtd}`)).data;
    }
}

export default new FollowService();
