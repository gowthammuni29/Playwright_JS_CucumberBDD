Feature: Home Page Device Selection
    As a logged in-user
    I want to view product details
    So that i can able to select the product

    @sanity @regression 
    Scenario: Select Phones Category Tab   
        Given user has storage state authentication and logged in
        When user selects category "Phones"
        Then phones details only should show on the Page

    @sanity @regression 
    Scenario Outline: Select different Devices from Phones Category
        Given user has storage state authentication and logged in
        When user selects category "Phones"
        And user selects device "<deviceName>"
        Then Selected device detail should show on the PDP Page
        Examples:
        | deviceName |
        | Samsung galaxy s6 |
        | Nexus 6 |
        | Iphone 6 32gb |
        | Sony xperia z5 |