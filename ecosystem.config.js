module.exports = {
  apps: [
    {
      name: "surmon.me",
      watch: true,
      cwd: "./",
      script: "node",
      args: "./node_modules/.bin/nuxt start",
      max_memory_restart: "160M",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "/usr/local/wwwlogs/surmon.me/error.log",
      out_file: "/usr/local/wwwlogs/surmon.me/out.log",
      env: {
        "NODE_ENV": "production",
      }
    }
  ]
}