import { Page } from 'puppeteer';

declare global {
  var page: Page;
  namespace NodeJS {
    interface Global {
      page: Page;
    }
  }
}

export {}; 