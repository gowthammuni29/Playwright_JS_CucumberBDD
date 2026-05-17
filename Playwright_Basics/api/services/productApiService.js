import { BaseApiClient } from '../base/baseApiClient.js';

export class ProductApiService extends BaseApiClient {
    constructor(request, baseURL) {
        super(request, baseURL);
    }

    async getAllProducts() {
        return this.get('/entries');
    }

    async getProductsByCategory(category) {
        return this.post('/bycat', { cat: category });
    }
}
