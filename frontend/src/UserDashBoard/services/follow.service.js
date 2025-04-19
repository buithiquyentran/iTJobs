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
    async getByUsername(maNld) { 
        return (await this.api.get(`/${maNld}`)).data;
    } 
    // async update(id, data) {
    //     return (await this.api.put(`/${id}`, data)).data;
    // }
    async delete(maNld, maNtd) {
        return (await this.api.delete(`/${maNld}/${maNtd}`)).data;
    }
}

export default new FollowService();
