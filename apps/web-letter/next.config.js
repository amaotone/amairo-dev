/** @type {import('next').NextConfig} */
const withTM = require("next-tranpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
});
