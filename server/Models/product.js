class Product {
  constructor(name, amount, price, oldPrice, optionValue, images, description, specs) {
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
      '${this.image}',
      '${this.description}',
      '${this.url}',
      '${this.active}',
      '${this.parent}'
    )
    `;
    return DB.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM Category;";
    return DB.execute(sql);
  }
}

module.exports = Product;
