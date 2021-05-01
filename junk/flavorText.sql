USE theBotler;

DROP TABLE IF EXISTS flavorText;

CREATE TABLE flavorText
(
  text_id      int       NOT NULL AUTO_INCREMENT,
  text_type    char(50)  NOT NULL ,
  text_flavor  char(50)  NOT NULL ,
  PRIMARY KEY (text_id)
) ENGINE=InnoDB;


##########################
# Populate flavorText table
##########################

INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (101, 'Error', 'Oh dear!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (102, 'Error', 'Dear God!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (103, 'Error', 'Blimey!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (104, 'Error', 'Deary me!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (105, 'Error', 'Oh no!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (106, 'Error', 'Good God!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (107, 'Error', 'Drats!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (108, 'Error', "For heaven's sake!");
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (109, 'Error', 'Good grief!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (110, 'Error', 'Are you alright?');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (111, 'Error', 'Goodness!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (112, 'Error', 'Honestly!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (113, 'Error', "Merlin's beard!");
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (114, 'Error', 'Absolutely not.');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (115, 'Error', 'Whoops!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (116, 'Error', 'Right then.');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (117, 'Error', "I don't think so.");
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (118, 'Error', 'Darn!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (119, 'Error', 'Rats!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (120, 'Error', 'Oh my goodness me.');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (121, 'Error', 'Inconceivable!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (122, 'Error', 'Unbelievable.');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (123, 'Error', 'Blimey!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (124, 'Error', 'For the love of God!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (125, 'Error', 'Good heavens!');

INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (126, 'Confirmation', 'Fantastic!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (127, 'Confirmation', 'Sensational!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (128, 'Confirmation', 'Good show!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (129, 'Confirmation', 'Well done!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (130, 'Confirmation', 'Hats off!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (131, 'Confirmation', 'Jolly good!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (132, 'Confirmation', 'Splendid!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (133, 'Confirmation', 'How riveting!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (134, 'Confirmation', 'Amazing!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (135, 'Confirmation', 'Congratulations!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (136, 'Confirmation', 'Excellent!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (137, 'Confirmation', 'Nicely done!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (138, 'Confirmation', 'Great work!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (139, 'Confirmation', 'Wonderful job!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (140, 'Confirmation', 'Kudos!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (141, 'Confirmation', 'Way to go!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (142, 'Confirmation', 'Felicitations!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (143, 'Confirmation', 'Nice going!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (144, 'Confirmation', 'You did it!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (145, 'Confirmation', "That's the way!");
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (146, 'Confirmation', "You're the best!");
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (147, 'Confirmation', 'You made it look easy!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (148, 'Confirmation', 'Keep it up!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (149, 'Confirmation', 'Congrats!');
INSERT INTO flavorText (text_id, text_type, text_flavor)
VALUES (150, 'Confirmation', 'Props, as the kids say!');