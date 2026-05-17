import logger from '../../helpers/logger.js';
import { expect } from '@playwright/test';

export class BaseApiClient {
    /**
     * @param {import('@playwright/test').APIRequestContext} request
     * @param {string} baseURL
     */
    constructor(request, baseURL) {
        this.request = request;
        this.baseURL = baseURL;
    }

    // ── HTTP Methods ──────────────────────────────────────────────────────────

    async get(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        logger.info(`[API] GET ${url}`);
        const response = await this.request.get(url, options);
        this._logStatus('GET', url, response.status());
        return response;
    }

    async post(endpoint, data = {}, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        logger.info(`[API] POST ${url} | Payload: ${JSON.stringify(data)}`);
        const response = await this.request.post(url, { data, ...options });
        this._logStatus('POST', url, response.status());
        return response;
    }

    async put(endpoint, data = {}, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        logger.info(`[API] PUT ${url} | Payload: ${JSON.stringify(data)}`);
        const response = await this.request.put(url, { data, ...options });
        this._logStatus('PUT', url, response.status());
        return response;
    }

    async patch(endpoint, data = {}, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        logger.info(`[API] PATCH ${url} | Payload: ${JSON.stringify(data)}`);
        const response = await this.request.patch(url, { data, ...options });
        this._logStatus('PATCH', url, response.status());
        return response;
    }

    async delete(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        logger.info(`[API] DELETE ${url}`);
        const response = await this.request.delete(url, options);
        this._logStatus('DELETE', url, response.status());
        return response;
    }

    // ── Response Parsers ──────────────────────────────────────────────────────

    /** Parse response body as JSON */
    async getJson(response) {
        return response.json();
    }

    /** Parse response body as plain text */
    async getText(response) {
        return response.text();
    }

    /** Get a specific response header value */
    getHeader(response, headerName) {
        return response.headers()[headerName.toLowerCase()];
    }

    /** Returns true if status is 2xx */
    isSuccess(response) {
        return response.ok();
    }

    /**
     * Extract a nested value from the response body using dot notation.
     * Example: extractValue(response, 'Items.0.title')
     */
    async extractValue(response, dotPath) {
        const body = await this.getJson(response);
        const value = dotPath.split('.').reduce((obj, key) => obj?.[key], body);
        logger.info(`[API] extractValue("${dotPath}") → ${JSON.stringify(value)}`);
        return value;
    }

    /** Log the full response body to the log file (useful for debugging) */
    async logResponseBody(response) {
        const body = await this.getText(response);
        logger.info(`[API] Response Body: ${body}`);
    }

    // ── Assertion Methods ─────────────────────────────────────────────────────

    /** Assert the response status code equals the expected value */
    assertStatus(response, expectedStatus) {
        logger.info(`[API] Assert status: expected=${expectedStatus}, actual=${response.status()}`);
        expect(response.status(), `Expected status ${expectedStatus} but got ${response.status()}`).toBe(expectedStatus);
    }

    /** Assert the response status is 2xx (ok) */
    assertStatusOk(response) {
        logger.info(`[API] Assert status is OK (2xx), actual=${response.status()}`);
        expect(response.ok(), `Expected 2xx status but got ${response.status()}`).toBeTruthy();
    }

    /** Assert the JSON body has a top-level property */
    async assertBodyHasProperty(response, property) {
        const body = await this.getJson(response);
        logger.info(`[API] Assert body has property: "${property}"`);
        expect(body, `Expected body to have property "${property}"`).toHaveProperty(property);
    }

    /** Assert a property in the JSON body equals an expected value */
    async assertBodyPropertyEquals(response, property, expectedValue) {
        const body = await this.getJson(response);
        const actual = property.split('.').reduce((obj, key) => obj?.[key], body);
        logger.info(`[API] Assert "${property}" equals "${expectedValue}", actual="${actual}"`);
        expect(actual, `Expected "${property}" to equal "${expectedValue}"`).toEqual(expectedValue);
    }

    /** Assert a property in the JSON body contains a substring or sub-value */
    async assertBodyPropertyContains(response, property, expectedValue) {
        const body = await this.getJson(response);
        const actual = property.split('.').reduce((obj, key) => obj?.[key], body);
        logger.info(`[API] Assert "${property}" contains "${expectedValue}", actual="${actual}"`);
        expect(String(actual), `Expected "${property}" to contain "${expectedValue}"`).toContain(String(expectedValue));
    }

    /** Assert an array in the JSON body is not empty */
    async assertArrayNotEmpty(response, arrayKey) {
        const body = await this.getJson(response);
        const arr = body[arrayKey];
        logger.info(`[API] Assert "${arrayKey}" array is not empty, length=${arr?.length}`);
        expect(Array.isArray(arr), `"${arrayKey}" is not an array`).toBeTruthy();
        expect(arr.length, `Expected "${arrayKey}" to be non-empty`).toBeGreaterThan(0);
    }

    /** Assert an array in the JSON body has an exact length */
    async assertArrayLength(response, arrayKey, expectedLength) {
        const body = await this.getJson(response);
        const arr = body[arrayKey];
        logger.info(`[API] Assert "${arrayKey}" length equals ${expectedLength}, actual=${arr?.length}`);
        expect(Array.isArray(arr), `"${arrayKey}" is not an array`).toBeTruthy();
        expect(arr.length, `Expected "${arrayKey}" length to be ${expectedLength}`).toBe(expectedLength);
    }

    /** Assert the response body (as text) contains a specific string */
    async assertBodyContainsText(response, text) {
        const body = await this.getText(response);
        logger.info(`[API] Assert body contains text: "${text}"`);
        expect(body, `Expected body to contain "${text}"`).toContain(text);
    }

    /** Assert a response header exists */
    assertHeaderExists(response, headerName) {
        const value = this.getHeader(response, headerName);
        logger.info(`[API] Assert header "${headerName}" exists, value="${value}"`);
        expect(value, `Expected header "${headerName}" to exist`).toBeDefined();
    }

    /** Assert a response header equals an expected value */
    assertHeaderEquals(response, headerName, expectedValue) {
        const value = this.getHeader(response, headerName);
        logger.info(`[API] Assert header "${headerName}" equals "${expectedValue}", actual="${value}"`);
        expect(value, `Expected header "${headerName}" to equal "${expectedValue}"`).toBe(expectedValue);
    }

    /** Assert the Content-Type header contains the expected MIME type */
    assertContentType(response, expectedType) {
        const contentType = this.getHeader(response, 'content-type');
        logger.info(`[API] Assert Content-Type contains "${expectedType}", actual="${contentType}"`);
        expect(contentType, `Expected Content-Type to contain "${expectedType}"`).toContain(expectedType);
    }

    // ── Private ───────────────────────────────────────────────────────────────

    _logStatus(method, url, status) {
        const level = status >= 400 ? 'error' : 'info';
        logger[level](`[API] ${method} ${url} → ${status}`);
    }
}
