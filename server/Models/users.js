const DB = require('../Config/db')

class Users {
  constructor(username, name, password, role, phone, email) {
    this.username = username;
    this.name = name;
    this.password = password;
    this.role = role;
    this.phone = phone;
    this.email = email;
  }

  save() {
    let sql = `
    INSERT INTO Users(
        username,
        name,
        password,
        role,
        phone,
        email
    )
    VALUES(
      '${this.username}',
      '${this.name}',
      '${this.password}',
      '${this.role}',
      '${this.phone}',
      '${this.email}'
    )
    `;

    return DB.execute(sql)
  }

  static findOneUser(username) {
    let sql = `SELECT * FROM Users WHERE username = '${username}' LIMIT 1`;
    return DB.execute(sql);
  }

  static finalAllUser() {
    let sql = `SELECT * FROM Users;`;

    return DB.execute(sql);
  }
}

module.exports = Users
