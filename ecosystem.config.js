/**
 * @file PM2 config
 * @module config.pm2
 * @author Surmon <surmon@foxmail.com>
 */

module.exports = {
  apps: [
    {
      name: 'surmon.me',
      instances: 'max',
      exec_mode: 'cluster',
      script: 'dist/bff.cjs.js',
      max_memory_restart: '268M',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: '/usr/local/wwwlogs/surmon.me/error.log',
      out_file: '/usr/local/wwwlogs/surmon.me/out.log',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
