module.exports = {
    apps : [
        {
          name: "chat_api",
          script: "./app.js",
          watch: true,
          env: {
            "NODE_ENV": "development",
          }
        }
    ]
  }