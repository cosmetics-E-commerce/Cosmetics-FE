/**
 * PM2 process definition for the storefront on the native production server.
 *
 * Shipped inside every release artifact and applied by the server's deploy
 * tool (cosmetics_platform/deploy/native) with
 * `pm2 startOrReload ecosystem.config.cjs --update-env`.
 *
 * Runs Nitro's node-server output (.output/server/index.mjs). Never `vite dev`
 * or `vite preview` in production. cwd is the `current` symlink so a crash
 * restart or `pm2 resurrect` always starts the active release.
 */
const path = require("node:path");

const root = process.env.BIOREZA_ROOT || "/srv/bioreza";

module.exports = {
  apps: [
    {
      name: "bioreza-storefront",
      cwd: path.join(root, "storefront", "current"),
      script: ".output/server/index.mjs",
      exec_mode: "fork",
      instances: 1,

      // 2 GB host shared with the API, Postgres, Redis and Nginx.
      node_args: ["--max-old-space-size=256", "--enable-source-maps"],
      max_memory_restart: "400M",

      kill_timeout: 10000,
      exp_backoff_restart_delay: 200,
      min_uptime: "20s",
      max_restarts: 10,
      autorestart: true,
      watch: false,
      merge_logs: true,
      time: true,

      env: {
        NODE_ENV: "production",
        // Loopback only: Nginx is the public entry point.
        HOST: "127.0.0.1",
        PORT: process.env.STOREFRONT_PORT || "5173",
      },
    },
  ],
};
