import { BaseApiClient } from '../base/baseApiClient.js';

export class AuthApiService extends BaseApiClient {
    constructor(request, baseURL) {
        super(request, baseURL);
    }

    async login(username, password) {
        return this.post('/login', { username, password });
    }
}
