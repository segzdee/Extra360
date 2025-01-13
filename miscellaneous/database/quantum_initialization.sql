CREATE DATABASE IF NOT EXISTS extrastaff360;
USE extrastaff360;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

INSERT INTO users (username, email, password_hash) 
VALUES ('segzdee', 'segzdeee@gmail.com', 'encrypted_password_placeholder');
