export default {
  require: [
    'steps/**/*.js',
    'support/**/*.js'
  ],
  paths: ["features/**/*.feature"],
  format: [
    'progress',
    'json:reports/cucumber-report.json'
  ]
};