const DB = require('../Config/db')

class Product {
  constructor(name, amount = 0, price = 0, oldPrice = 0, optionValue, images, description, specs) {
    this.name = name;
    this.amount = amount;
    this.price = price;
    this.oldPrice = oldPrice;
    this.optionValue = optionValue;
    this.images = images;
    this.description = description;
    this.specs = specs;
  }

  save() {
    console.log(this.name)
    let sql = `
    INSERT INTO Product(
        name,
        amount,
        price,
        oldPrice,
        optionValue,
        images,
        description,
        specs
    )
    VALUES(
      '${this.name}',
      '${this.amount}',
      '${this.price}',
      '${this.oldPrice}',
      '${this.optionValue}',
      '${this.images}',
      '${this.description}',
      '${this.specs}'
    )
    `;
    return DB.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM Product;";
    return DB.execute(sql);
  }

  static findFromCategory() {
    
  }
}

module.exports = Product;
