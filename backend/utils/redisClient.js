// var redis = require("redis");
// class Redis {
//   constructor() {
//     console.log(process.env.REDIS_HOST, process.env.REDIS_PORT);
//     this.host = process.env.REDIS_HOST || "localhost";
//     this.port = process.env.REDIS_PORT || "6379";
//     this.connected = false;
//     this.client = null;
//   }
//   getConnection() {
//     if (this.connected) return this.client;
//     else {
//       this.client = redis.createClient({
//         host: this.host,
//         port: this.port,
//       });
//       this.client.on("connect", () => {
//         console.log("Redis connected");
//         this.connected = true;
//       });
//       this.client.on("error", (err) => {
//         console.log("Redis error: " + err);
//       });
//       return this.client;
//     }
//   }
// }

// // This will be a singleton class. After first connection npm will cache this object for whole runtime.
// // Every time you will call this getConnection() you will get the same connection back
// module.exports = new Redis();
