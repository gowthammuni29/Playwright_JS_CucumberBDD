Feature: Product Detail Page Validations
    As I selected the product
    I want to check the Complete details in PDP Page
    So that I can add it to the cart

        Background:
            Given user has storage state authentication and logged in

        @sanity @regression 
        Scenario: Validate the Selected Product Details
            When user selects device "Iphone 6 32gb"
            Then selected product should be displayed on PDP Page
            And product price should be displayed on PDP Page
            And product description should be displayed
            And Add to Cart button enabled

        @sanity @regression  @addToCart
        Scenario: Add product to cart from PDP
            When user selects device "Iphone 6 32gb"
            And user clicks on Add to Cart button
            Then Alert message should be displayed and to be accepted
        