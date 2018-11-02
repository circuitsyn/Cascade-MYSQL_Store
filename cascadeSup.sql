USE CASCADE_DB;

CREATE TABLE departments (
  Department_ID INT AUTO_INCREMENT,
  Department_Name VARCHAR(100) NULL,
  Over_Head_Costs DECIMAL(10,2) NULL,
  PRIMARY KEY (Department_ID)
);

INSERT INTO departments (Department_Name)
VALUES ('Electronics'), ('Food'), ('Books'), ('Holiday');

SELECT * FROM departments;

SELECT departments.Department_ID, departments.Department_Name, departments.Over_Head_Costs, SUM(products.Sold) AS Total_Sold, SUM(products.Product_Sales) - departments.Over_Head_Costs AS Total_Profit
FROM products
INNER JOIN departments
ON products.Dept_Name = departments.Department_Name
GROUP BY departments.Department_Name;