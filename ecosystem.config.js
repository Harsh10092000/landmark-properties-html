module.exports = {
    apps: [
      {
        name: 'landmarkplots',
        script: 'npm',
        args: 'start -- --port 3006',
        watch: ['public/uploads'], // Watch only public/uploads
        ignore_watch: ['node_modules', 'logs', '.git', '.next'], // Ignore unnecessary directories
        watch_delay: 1000, // Delay restart by 1 second to avoid rapid restarts
      },
    ],
  };