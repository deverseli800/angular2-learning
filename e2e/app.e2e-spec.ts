import { Angular2InterviewProjectPage } from './app.po';

describe('angular2-interview-project App', function() {
  let page: Angular2InterviewProjectPage;

  beforeEach(() => {
    page = new Angular2InterviewProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
