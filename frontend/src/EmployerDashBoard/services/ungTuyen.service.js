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
    async getByMA_NTD(MA_NTD) {
        return (await this.api.get(`/ntd/${MA_NTD}`)).data;
    }
    async update(sdt, maTtd, data) {
        return (await this.api.put(`/${sdt}/${maTtd}`, data)).data;
    }
    async delete(sdt, maTtd) {
        return (await this.api.delete(`/${sdt}/${maTtd}`)).data;
    }
}

export default new UngTuyenService();
