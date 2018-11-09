USE CASCADE_DB;

CREATE TABLE departments (
  Department_ID INT AUTO_INCREMENT,
  Department_Name VARCHAR(100) NULL,
  Over_Head_Costs DECIMAL(10,2) DEFAULT 0,
  PRIMARY KEY (Department_ID)
);

INSERT INTO departments (Department_Name)
VALUES ('Electronics'), ('Food'), ('Books'), ('Holiday');

SELECT * FROM departments;

