class OrdersItem {
    constructor(amount, price, optionValue, ordersId, productId) {
      this.amount = amount;
      this.price = price;
      this.optionValue = optionValue;
      this.ordersId = ordersId;
      this.productId = productId;
    }
  
    save() {
      let sql = `
      INSERT INTO OrdersItem(
        amount,
        price,
        optionValue,
        ordersId,
        productId
      )
      VALUES(
        '${this.amount}',
        '${this.price}',
        '${this.optionValue}',
        '${this.ordersId}',
        '${this.productId}'
      )
      `;
      return DB.execute(sql);
    }
  
    static findAll() {
      let sql = "SELECT * FROM OrdersItem;";
      return DB.execute(sql);
    }
  }
  
  module.exports = OrdersItem;
  