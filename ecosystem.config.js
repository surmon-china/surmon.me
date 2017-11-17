module.exports = {
  apps: [
    {
      name: "surmon.me",
      script: "server.js",
      max_memory_restart: "268M",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "/usr/local/wwwlogs/surmon.me/error.log",
      out_file: "/usr/local/wwwlogs/surmon.me/out.log",
      args: [
        "--rtc_uri=turn:47.96.19.254:3478",
        "--rtc_key=46c51c9b608743bdbd60eabe1424bc5f"
      ],
      env: {
        "NODE_ENV": "production",
      }
    }
  ]
}
