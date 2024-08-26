class Orders {
    constructor(orderTime, sumPrice, userId) {
      this.orderTime = orderTime;
      this.sumPrice = sumPrice;
      this.userId = userId;
    }
  
    save() {
      let sql = `
      INSERT INTO Orders(
        ordersTime,
        sumPrice,
        userId
      )
      VALUES(
        '${this.orderTime}',
        '${this.sumPrice}',
        '${this.userId}'
      )
      `;
      return DB.execute(sql);
    }
  
    static findAllOrdersToUser(userId) {
      let sql = `SELECT * FROM Orders WHERE Orders.userId = userId;`;
      return DB.execute(sql);
    }
  }
  
  module.exports = Orders;
  