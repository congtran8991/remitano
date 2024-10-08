const DB = require('../Config/db')

class Category {
  constructor(name, image, description, url, active, parentId) {
    this.name = name;
    this.image = image;
    this.description = description;
    this.url = url;
    this.active = active;
    this.parentId = parentId;
  }

  save() {
    let sql = `
    INSERT INTO Category(
        name,
        image,
        description,
        url,
        active,
        parentId
    )
    VALUES(
      '${this.name}',
      '${this.image}',
      '${this.description}',
      '${this.url}',
      '${this.active}',
      ${this.parentId}
    )
    `;
    return DB.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM Category;";
    return DB.execute(sql);
  }
}

module.exports = Category;
