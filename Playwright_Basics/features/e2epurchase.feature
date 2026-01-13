Feature: Device Purchase E2E

    As I logged in user
    I want to select a device
    So that I can make a purchase

    Background:
        Given user has storage state authentication and logged in
        

    
    @smoke
    Scenario: User end to end device purchase 
        When user selects device "Iphone 6 32gb"
        And adds it to cart with alert message confirmation
        And user navigate to the cart page
        And user clicked place order button
        And user fills the purchase details with valid information
        Then order should be placed successfully with order confirmation message
        And user completes the purhcase with selecting ok 
