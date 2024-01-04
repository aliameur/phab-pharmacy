module.exports = {
  '{packages,apps}/**/*.{js,jsx,ts,tsx,json,md,html,css,scss}': [
    //'nx affected --target lint --exclude mobile-app --uncommitted --fix true',
    //'nx affected --target test --exclude mobile-app assistant-api --passWithNoTests true --uncommitted', // added --passWithNoTests to avoid error when no tests are found, TEMP FIX
    //'nx affected --target format:check --uncommitted',
  ],
};
