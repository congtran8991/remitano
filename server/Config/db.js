require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: "localhost",
  user: "pma",
  password: "1234",
  database: "Webbanhang",
  multipleStatements: true,
});

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!!!");
//   const createTables = `
//     CREATE TABLE User (
//       id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//       username VARCHAR(100),
//       name VARCHAR(255),
//       password VARCHAR(255),
//       role VARCHAR(100),
//       phone VARCHAR(255),
//       email VARCHAR(255),
//       point INT,
//       public BOOLEAN
//     );
  
//     CREATE TABLE Orders (
//       id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//       orderTime INT,
//       sumPrice INT,
//       userId INT,
//       FOREIGN KEY (userId) REFERENCES User(id)
//     );
  
//     CREATE TABLE Cart (
//       id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//       userId INT UNIQUE,
//       FOREIGN KEY (userId) REFERENCES User(id)
//     );
  
//     CREATE TABLE CartItem (
//       id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//       amount INT,
//       optionValue LONGTEXT,
//       cartId INT,
//       productId INT UNIQUE,
//       FOREIGN KEY (cartId) REFERENCES Cart(id),
//       FOREIGN KEY (productId) REFERENCES Product(id)
//     );
  
//     CREATE TABLE Product (
//       id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(100),
//       amount INT,
//       price INT,
//       oldPrice INT,
//       optionValue LONGTEXT,
//       images LONGTEXT,
//       description LONGTEXT,
//       specs LONGTEXT,
//       public BOOLEAN,
//       cartItemId INT UNIQUE,
//       FOREIGN KEY (cartItemId) REFERENCES CartItem(id)
//     );
  
//     CREATE TABLE OrdersItem (
//       id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//       amount INT,
//       price INT,
//       optionValue LONGTEXT,
//       ordersId INT,
//       productId INT,
//       FOREIGN KEY (ordersId) REFERENCES Orders(id),
//       FOREIGN KEY (productId) REFERENCES Product(id)
//     );
  
//     CREATE TABLE Category (
//       id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255),
//       image VARCHAR(255),
//       description LONGTEXT,
//       url VARCHAR(255),
//       public BOOLEAN,
//       parentId INT,
//       FOREIGN KEY (parentId) REFERENCES Category(id)
//     );
  
//     CREATE TABLE CategoryProduct (
//       id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//       categoryId INT,
//       productId INT,
//       FOREIGN KEY (categoryId) REFERENCES Category(id),
//       FOREIGN KEY (productId) REFERENCES Product(id)
//     );
//   `;
//   // con.query(createTables, (error, result) => {
//   //   if (error) throw error;
//   //   console.log(result);
//   // });
// });

module.exports = pool.promise();
