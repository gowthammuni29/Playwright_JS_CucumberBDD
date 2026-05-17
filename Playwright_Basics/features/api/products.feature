@api
Feature: Products API
    As a QA engineer
    I want to validate the Products API endpoints
    So that I can ensure the backend returns correct data

    @smoke @api
    Scenario: Get all products returns 200
        Given I send a GET request to get all products
        Then the response status code should be 200
        And the response should contain a list of products

    @smoke @api
    Scenario Outline: Get products by category returns correct items
        Given I send a POST request to get products by category "<category>"
        Then the response status code should be 200
        And the response body should contain products

        Examples:
            | category |
            | phone    |
            | notebook |
            | monitor  |

    @regression @api
    Scenario: Login API returns auth token for valid credentials
        Given I send a login request with valid credentials
        Then the response status code should be 200
        And the response should contain an auth token
