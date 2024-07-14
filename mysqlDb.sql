-- database setup
CREATE DATABASE fuelinsight;
USE fuelinsight;

CREATE TABLE fuelprice (
	id integer PRIMARY KEY AUTO_INCREMENT,
	fuelStationId integer NOT NULL,
	price DOUBLE NOT NULL,
	created TIMESTAMP  NOT NULL DEFAULT NOW()	
);

CREATE TABLE fuelstation (
	id integer PRIMARY KEY AUTO_INCREMENT,
	tankerId integer NOT NULL,
	name VARCHAR(255) NOT NULL,
	lat double NOT NULL,
	lng double NOT NULL,
	created TIMESTAMP  NOT NULL DEFAULT NOW()	
);

-- fill dummy data 
INSERT INTO fuelstation (tankerId, name, lat, lng)
VALUES
(234, 'aral', 2.34, 23.4),
(345, 'star', 3.45, 34.5);

INSERT INTO fuelprice (fuelStationId, price)
VALUES
(1, 1.83), (1, 1.85), (1, 1.86),
(2, 1.84), (2, 1.45), (2, 1.70);