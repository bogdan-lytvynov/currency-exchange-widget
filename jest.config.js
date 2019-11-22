// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
   "testMatch": [
     "**/test/**/*.test.js",
   ],
  "transform": {
    "^.+\\.jsx$": "babel-jest"
  },
  "moduleNameMapper": {
    "\\.css": "<rootDir>/test/css.stub.js",
    "\\.svg": "<rootDir>/test/svg.stub.js",
  }
};
