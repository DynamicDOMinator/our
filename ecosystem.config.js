module.exports = {
  apps: [{
    name: 'prosental-front',
    script: 'npm',
    args: 'start',
    env: {
      PORT: 80,
      NODE_ENV: 'production',
    },
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
  }],
};