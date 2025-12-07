import { LoginPage } from "../../pages/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";

Feature('UI Testing');

Scenario('Scenario 1: login, add items, remove third item, checkout',  ({ I }) => {

    I.amOnPage('/');
    LoginPage.fillLoginForm(process.env.STANDARD_USER, process.env.STANDARD_USER_PASS);
    I.click(LoginPage.fields.loginButton);
    I.waitForVisible('div[id="inventory_container"]', 5);
    ProductsPage.AddToCart('sauce-labs-backpack');
    ProductsPage.AddToCart('sauce-labs-bike-light');
    ProductsPage.AddToCart('sauce-labs-bolt-t-shirt');
    ProductsPage.AddToCart('sauce-labs-fleece-jacket');
    ProductsPage.AddToCart('sauce-labs-onesie');
    ProductsPage.AddToCart('test.allthethings()-t-shirt-(red)');
    I.click('a[class="shopping_cart_link"]');
    I.waitForVisible('div[class="cart_list"]', 5);
    CartPage.DeleteFromCartByIndex(3);

    //Should be exactly 5 items in the cart
    I.seeNumberOfVisibleElements('div[class="cart_item"]', 5);
    I.seeElement('//div[@data-test="inventory-item-name" and text()="Sauce Labs Backpack"]');
    I.seeElement('//div[@data-test="inventory-item-name" and text()="Sauce Labs Bike Light"]');
    I.seeElement('//div[@data-test="inventory-item-name" and text()="Sauce Labs Fleece Jacket"]');
    I.seeElement('//div[@data-test="inventory-item-name" and text()="Sauce Labs Onesie"]');
    I.seeElement('//div[@data-test="inventory-item-name" and text()="Test.allTheThings() T-Shirt (Red)"]');

    //Finish purchasing the items
    I.click('button[data-test="checkout"]');
    I.fillField('input[data-test="firstName"]', 'Nikodem');
    I.fillField('input[data-test="lastName"]', 'God');
    I.fillField('input[data-test="postalCode"]', '63-620');
    I.click('input[data-test="continue"]');
    I.click('button[data-test="finish"]');
    I.see('Thank you for your order!', 'h2[class="complete-header"]');
    
});


Scenario('Scenario 2: Finding item by name, adding to cart',  ({ I }) => {
    I.amOnPage('/');
    LoginPage.fillLoginForm(process.env.PROBLEM_USER, process.env.PROBLEM_USER_PASS);
    I.click(LoginPage.fields.loginButton);
    I.waitForVisible('div[id="inventory_container"]', 5);
    ProductsPage.AddToCart('sauce-labs-backpack');
    I.click('a[class="shopping_cart_link"]');
    I.waitForVisible('div[class="cart_list"]', 5);
    I.seeNumberOfVisibleElements('div[class="cart_item"]', 1);
    I.seeElement('//div[@data-test="inventory-item-name" and text()="Sauce Labs Backpack"]');
    
});

Scenario('Scenario 3: Sorting products', ({ I }) => {
    I.amOnPage('/');
    LoginPage.fillLoginForm(process.env.STANDARD_USER, process.env.STANDARD_USER_PASS);
    I.click(LoginPage.fields.loginButton);
    I.waitForVisible('div[id="inventory_container"]', 5);

    //Sort products by Name (Z to A)
    I.selectOption('select[data-test="product-sort-container"]', 'za');
    I.seeTextEquals('Test.allTheThings() T-Shirt (Red)', '(//div[@data-test="inventory-item-name"])[1]');
    I.seeTextEquals('Sauce Labs Backpack', '(//div[@data-test="inventory-item-name"])[6]');

    //Sort products by Name (A to Z)
    I.selectOption('select[data-test="product-sort-container"]', 'az');
    I.seeTextEquals('Test.allTheThings() T-Shirt (Red)', '(//div[@data-test="inventory-item-name"])[6]');
    I.seeTextEquals('Sauce Labs Backpack', '(//div[@data-test="inventory-item-name"])[1]');

});

Scenario('Scenario 4: No success to login as locked user', ({ I }) => {
    I.amOnPage('/');
    LoginPage.fillLoginForm(process.env.LOCKED_USER, process.env.LOCKED_USER_PASS);
    I.click(LoginPage.fields.loginButton);
    I.waitForVisible('h3[data-test="error"]', 5);
    I.see('Epic sadface: Sorry, this user has been locked out.', 'h3[data-test="error"]');
});
