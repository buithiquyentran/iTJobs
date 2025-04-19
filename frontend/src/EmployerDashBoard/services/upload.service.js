import createApiClient from './api.service';

class UploadService {
    constructor(baseUrl = '/api/upload') {
        this.api = createApiClient(baseUrl);
    }
    // async getAll() {
    //     return (await this.api.get('/')).data;
    // }
    async uploadImage(data, config) {
        return (await this.api.post('/', data, config)).data;
    }
    async uploadCV(MA_NLD, data, config) {
        return (await this.api.post(`/upload-cv/${MA_NLD}`, data, config)).data.newCV;
    }
    // async deleteAll() {
    //     return (await this.api.delete('/')).data;
    // }

    // async update(id, data) {
    //     return (await this.api.put(`/${id}`, data)).data;
    // }

    // async delete(sdt, maTtd) {
    //     return (await this.api.delete(`/${sdt}/${maTtd}`)).data;
    // }
}

export default new UploadService();
