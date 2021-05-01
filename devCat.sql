USE theBotler;

DROP TABLE IF EXISTS devCats;

CREATE TABLE devCats
(
  image_id     int          NOT NULL AUTO_INCREMENT,
  image_devCat varchar(255) NOT NULL,
  PRIMARY KEY (image_id)
) ENGINE=InnoDB;

##########################
# Populate flavorText devCats
##########################

INSERT INTO devCats (image_devCat)
VALUES ('./devCats/Cat1.png');
INSERT INTO devCats (image_devCat)
VALUES ('./devCats/Cat2.png');
INSERT INTO devCats (image_devCat)
VALUES ('./devCats/Cat3.png');
INSERT INTO devCats (image_devCat)
VALUES ('./devCats/Cat4.png');
INSERT INTO devCats (image_devCat)
VALUES ('./devCats/Cat5.png');
INSERT INTO devCats (image_devCat)
VALUES ('./devCats/Cat6.png');
INSERT INTO devCats (image_devCat)
VALUES ('./devCats/Cat7.png');
INSERT INTO devCats (image_devCat)
VALUES ('./devCats/Cat8.png');
INSERT INTO devCats (image_devCat)
VALUES ('./devCats/Cat9.png');
INSERT INTO devCats (image_devCat)
VALUES ('./devCats/Cat11.png');
INSERT INTO devCats (image_devCat)
VALUES ('./devCats/Cat11.png');
INSERT INTO devCats (image_devCat)
VALUES ('./devCats/Cat12.png');