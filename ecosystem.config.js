module.exports = {
  apps: [
    {
      name: "surmon.me",
      cwd: "./",
      script: "server.js",
      args: "cross-env",
      max_memory_restart: "188M",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "/usr/local/wwwlogs/surmon.me/error.log",
      out_file: "/usr/local/wwwlogs/surmon.me/out.log",
      env: {
        "NODE_ENV": "production",
      }
    }
  ]
}