import report from 'multiple-cucumber-html-reporter';

report.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html',
  pageTitle: 'BDD Automation Report',
  reportName: 'Cucumber BDD Report',
  displayDuration: true,
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest'
    },
    platform: {
      name: 'Windows'
    }
  }
});
