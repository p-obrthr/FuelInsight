-- database setup
CREATE DATABASE fuelinsight;
USE fuelinsight;

CREATE TABLE fuelstation (
	id integer PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	price DOUBLE NOT NULL,
	created TIMESTAMP  NOT NULL DEFAULT NOW()	
);

-- fill dummy data 
INSERT INTO fuelstation (name, price)
VALUES
("aral", 1.83),
("star", 1.84);