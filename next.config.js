/** @type {import('next').NextConfig} */
const { parsed: localEnv } = require('dotenv').config({
  path: './.env.local',
});
module.exports = {
  reactStrictMode: true,
  env: {
    ATLASSIAN_CLIENT_ID: localEnv.ATLASSIAN_CLIENT_ID,
    ATLASSIAN_CLIENT_SECRET: localEnv.ATLASSIAN_CLIENT_SECRET,
  },
}
