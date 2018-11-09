DROP DATABASE IF EXISTS CASCADE_DB;

CREATE DATABASE CASCADE_DB;

USE CASCADE_DB;

CREATE TABLE products (
  ID INT AUTO_INCREMENT,
  Product_Name VARCHAR(100) NULL,
  Dept_Name VARCHAR(100) NULL,
  Price DECIMAL(10,2) NULL,
  Stock_Qty INTEGER(10),
  Sold INTEGER(10) DEFAULT 0,
  PRIMARY KEY (id)
);

INSERT INTO products (Product_Name, Dept_Name, Price, Stock_Qty, Sold)
VALUES ('Sony WH1000XM3 Wireless Headphones','Electronics',350.00,25), ('Macbook Pro 15" 256GB 16GB RAM Retina','Electronics',2800.00,13), ('Nikon D500 SLR 24MP','Electronics',1700.00,30), ('Trail Mix: Coco Peanut Butter & Jelly, 5lbs','Food',23.55,150), ('Turkey Jerky, 15lbs','Food',35.99,97), ('Vegan Cheddar Puffed Chickpeas, 120oz','Food',15.50,75), ('Getting to Know Arduino','Books',27.99,39), ("You Don't Know JS",'Books',5.87,94), ('Learning to Code Python the Hard Way','Books',17.89,32), ('Christmas Tree, 350 LED','Holiday',89.99,15);

SELECT * FROM products;