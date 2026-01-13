import type { Page } from 'playwright';
import type { HomePage } from '../pages/homePage.js';
import type { LoginPage } from '../pages/loginPage.js';
import type { BasePage } from '../pages/basePage.js';
import type { ProductDetailPage } from '../pages/productDetailPage.js';
import { CartPage } from '../pages/cartPage.js';
import {SelectProductAndPrice} from '../support/model/selectProductAndPrice.model.js';

export interface CustomWorld {
  page: Page;
  homePage: HomePage;
  loginPage: LoginPage;
  basePage: BasePage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  /** single device PDP page validation */
  expectDeviceName: string;

  /** For simple device name validations */
  selectedProduct:string[];

  /** for device and price validation */
  selectedProductAndPrice: SelectProductAndPrice[];
  
  }
