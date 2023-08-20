const redis = require("redis");

const timeCache = 30 * 24 * 60 * 60 // 30 ngày

const client = redis.createClient({
  host: "localhost", // Địa chỉ IP của máy chủ Redis
  port: 6379,
});

class Cache {
  constructor() {
    this.client = client;
    this.connected = false
  }
  static init() {
    client.on("connect", function () {
      console.log("Đã kết nối đến Redis server");
    });

    client.on("error", (err) => {
      console.log("Redis Client Error", err);
    });


    client.connect();
  }

  static setCache (key, value) {
    try {
      if(this.connected){
        client.setEx(key, timeCache, JSON.stringify(value))
      }
    } catch (error) {
      console.log("Lỗi cache Redis", error)
    }
  }

  static testLog () {
    client.on("ready", () => {
      this.connected = true
      console.log("kết nối được thiết lập");

    })
    console.log(this.connected)
  }

  static quit() {
    process.on("SIGINT", function () {
      client.quit();
      console.log("Đã đóng kết nối đến Redis server");
    });
  }
}

module.exports = Cache;
