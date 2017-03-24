import { CanteenAutomationSystemPage } from './app.po';

describe('canteen-automation-system App', function() {
  let page: CanteenAutomationSystemPage;

  beforeEach(() => {
    page = new CanteenAutomationSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
