module.exports = {
  apps: [
    {
      name: "app",
      script: "./app.js",
      instances: "max",
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
