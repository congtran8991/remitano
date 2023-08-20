class Category {
  constructor(name, image, description, url, active, parent) {
    this.name = name;
    this.image = image;
    this.description = description;
    this.url = url;
    this.active = active;
    this.parent = parent;
  }

  save() {
    let sql = `
    INSERT INTO Category(
        name,
        image,
        description,
        url,
        active,
        parent
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

module.exports = Category;
