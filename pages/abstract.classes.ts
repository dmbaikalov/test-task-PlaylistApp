import { Page, test, expect, Locator } from '@playwright/test';

export class PageHolder {
  constructor(protected page: Page) {}
}

export abstract class BasePage extends PageHolder {
  public pagePath: string = `${process.env.BASE_URL}`;

  async open() {
    await this.page.goto(this.pagePath);
  }

  async isOpen(expected_url?: string) {
    expect(this.page.url()).toBe(
      expected_url || `${process.env.BASE_URL}${this.pagePath}`
    );
  }
}
