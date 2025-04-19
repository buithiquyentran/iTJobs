import createApiClient from './api.service';

class UngTuyenService {
    constructor(baseUrl = '/api/ung-tuyen') {
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
    async get(sdt, maTtd) {
        return (await this.api.get(`/${sdt}/${maTtd}`)).data;
    }
    async getByUsername(sdt) {
        return (await this.api.get(`/username/${sdt}`)).data;
    }
    // async update(id, data) {
    //     return (await this.api.put(`/${id}`, data)).data;
    // }
    async delete(sdt, maTtd) {
        return (await this.api.delete(`/${sdt}/${maTtd}`)).data;
    }
}

export default new UngTuyenService();
