DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments (
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(40) NOT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE role (
   id INT NOT NULL AUTO_INCREMENT,
   role VARCHAR(60) NOT NULL,
   salary DECIMAL(10,2),
   departments_id INT NOT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE employees (
   id INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT NOT NULL,
   manager_id INT,
   PRIMARY KEY (id)
);

SELECT * FROM departments;
SELECT * FROM role;
SELECT * FROM employees;

