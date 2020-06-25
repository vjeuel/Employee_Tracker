DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments (
   ID INT NOT NULL AUTO_INCREMENT,
   department VARCHAR(40) NOT NULL,
   PRIMARY KEY (ID)
);

CREATE TABLE roles (
   ID INT NOT NULL AUTO_INCREMENT,
   title VARCHAR(60) NOT NULL,
   salary DECIMAL(10,2),
   departments_ID INT NOT NULL,
   PRIMARY KEY (ID)
);

CREATE TABLE employees (
   ID INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_ID INT NOT NULL,
   manager_ID INT,
   PRIMARY KEY (ID)
);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

SELECT DISTINCT title FROM roles