module.exports = {
  apps: [
    {
      name: "surmon.me",
      instances: 1,
      watch: true,
      script: "npm",
      args: "run start",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      // error_file: "/usr/local/wwwlogs/surmon.me/error.log",
      // out_file: "/usr/local/wwwlogs/surmon.me/out.log"
    }
  ]
}