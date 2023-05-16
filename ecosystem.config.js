module.exports = {
  apps: [
    {
      name: "app",
      script: "./app.js",
      instances: "./src/server.js",
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
