module.exports = {
  '{packages,apps}/**/*.{js,jsx,ts,tsx,json,md,html,css,scss}': [
    'nx affected --target lint --exclude mobile-app --uncommitted --fix true',
    // 'nx affected --target test --uncommitted',
    'nx format:write --uncommitted',
  ],
};
