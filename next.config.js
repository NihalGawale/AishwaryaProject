/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const { parsed: myEnv } = require("dotenv").config({
  path: "/env",
});

const nextConfig = {
  // webpack(config) {
  //   config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
  //   return config;
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
