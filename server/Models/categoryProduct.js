const DB= require('../Config/db')

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
        '${this.productId}'
      )
      `;
      return DB.execute(sql);
    }
  
    static findAllProductToCategory(categoryId) {
      let sql = `SELECT * FROM Product JOIN CategoryProduct ON Product.id = CategoryProduct.id WHERE CategoryProduct.id = ${categoryId};`;
      return DB.execute(sql);
    }
  }
  
  module.exports = categoryProduct;
  