class categoryProduct {
    constructor(categoryId, productId) {
      this.categoryId = categoryId;
      this.productId = productId;
    }
  
    save() {
      let sql = `
      INSERT INTO CategoryProduct(
        categoryId,
        productId
      )
      VALUES(
        '${this.categoryId}',
        '${this.sumPrice}',
        '${this.productId}'
      )
      `;
      return DB.execute(sql);
    }
  
    static findAll() {
      let sql = "SELECT * FROM CategoryProduct;";
      return DB.execute(sql);
    }
  }
  
  module.exports = categoryProduct;
  