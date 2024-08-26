const redis = require("redis");

const timeCache = 30 * 24 * 60 * 60; // 30 ngày

const client = redis.createClient({
  legacyMode: true,
  host: "localhost", // Địa chỉ IP của máy chủ Redis
  port: 6379,
});

class Cache {
  constructor() {
    this.client = client;

  }
  static async init() {
    client.on("connect", function () {
      console.log("Đã kết nối đến Redis server");
    });

    client.on("error", (err) => {
      console.log("Redis Client Error:", err);
    });

    client.connect().then(() => {
      console.log("connect to redis")
    }).catch((err) => {
      // console.log(err,"errrrrrr1")
    });
  }

  static setCache(key, value) {
    client.setEx(key, timeCache, JSON.stringify(value), (error, result) => {
      if(error){
        console.error("Lỗi khi lưu dữ liệu vào Redis:", error);
      } else {
        console.log("Dữ liệu đã được lưu vào Redis với thời gian sống.",result)
      }
    });
  }

  static getCache (key) {
    const cacheResults =  client.getEx(key);
    return JSON.parse(cacheResults)
  }

  static getAll() {
    client.keys('*', (err, keys) => {
      console.log(keys,"keysssss")
    })
  }

  

  static quit() {
    process.on("SIGINT", function () {
      client.quit();
      console.log("Đã đóng kết nối đến Redis server");
    });
  }
}

module.exports = Cache;
