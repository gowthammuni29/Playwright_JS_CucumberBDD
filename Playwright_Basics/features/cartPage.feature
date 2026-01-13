Feature: Cart Page Validations

    As I added the device to the cart
    I want to validate all information in cart Page
    So that I can make a purchase

    Background:
        Given user has storage state authentication and logged in
        

    @sanity @regression 
    Scenario: Validate product details in cart page
        When user selects device "Iphone 6 32gb"
        And adds it to cart with alert message confirmation
        And user navigate to the cart page
        Then selected items are visible in cart page
        And place order button should be enabled

    @sanity @regression
    Scenario: Validate remove device from Cart
        When user selects device "Iphone 6 32gb"
        And adds it to cart with alert message confirmation
        And user navigate to the cart page
        And user clicked on remove button
        Then device cart should be empty

    @sanity @regression
    Scenario: Add multiple device to the cart and validate the total price
        When user adds the following devices to the cart:
            |   deviceName        |
            |   Samsung galaxy s6 |
            |   Nokia lumia 1520  |     
        And user navigate to the cart page
        Then cart should display all the products
        And cart total price should be equal to the sum of device price

    
    Scenario: Validate the purchase form without required fields
        When user selects device "Iphone 6 32gb"
        And adds it to cart with alert message confirmation
        And user navigate to the cart page
        And user clicked place order button
        And user clicked purchase without updating the input field an alert should be shown

    @sanity @regression
    Scenario: User end to end device purchase 
        When user selects device "Iphone 6 32gb"
        And adds it to cart with alert message confirmation
        And user navigate to the cart page
        And user clicked place order button
        And user fills the purchase details with valid information
        Then order should be placed successfully with order confirmation message
        And user completes the purhcase with selecting ok 

        


