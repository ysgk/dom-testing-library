import 'core-js/stable'

const testsContext = require.context('./src/__tests__', true, /.*\.karma\.js?$/)

testsContext.keys().forEach(testsContext)

// These are settings to run jest tests on karma.
// https://www.kabuku.co.jp/developers/run-jest-on-browsers
// https://github.com/kimamula/jest-karma-angular-demo/blob/master/src/test.ts
window.jest = require('jest-mock')
window.expect = require('expect')
